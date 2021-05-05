const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY });

const q = faunadb.query;

// add a post to database with specific format from editor with id, version, and rows as input data.
const createPost = async (id, version, rows) => {
    return await faunaClient.query(
        q.Create(q.Collection('published_posts'), {
            data: { id, version, rows },
        })
    );
};

// query database to get all posts
const getPosts = async () => {
    // map all posts from collection to data
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('published_posts'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    );
    
    // map posts so that id is converted to json. Name _id to not confuse with editor data id.
    const posts = data.map((post) => {
        post._id = post.ref.id;

        delete post.ref;

        return post;
    });

    return posts;
};

// retrieve single post by id from database. Named _id to not confuse with editor id value.
const getPostById = async (_id) => {
    const post = await faunaClient.query(
        q.Get(q.Ref(q.Collection('published_posts'), _id))
    );
    post._id = post.ref.id;
    delete post.ref;
    return post;
};

// query database to get all posts by user

// update a post
const updatePost = async ( id, version, rows, _id ) => {
    return await faunaClient.query(
        q.Update(
          q.Ref(q.Collection('published_posts'), _id),
          { data: { id, version, rows } },
        )
      );
};

//delete a post
const deletePost = async (_id) => {
    return await faunaClient.query(
        q.Delete(q.Ref(q.Collection('published_posts'), _id))
    );
};

// add draft to database with specific format from editor with id, version, and rows as input data.
const createDraft = async (id, version, rows) => {
    return await faunaClient.query(
        q.Create(q.Collection('drafts'), {
            data: { id, version, rows },
        })
    );
};

// query database to get all drafts by user 

// retrieve single draft from database, convert to proper json.
const getDraftById = async (_id) => {
    const draft = await faunaClient.query(
        q.Get(q.Ref(q.Collection("drafts"), _id)));
    
    draft._id = draft.ref.id;

    delete draft.ref;
    
    return draft;
}



// update a draft
const updateDraft = async ( id, version, rows, _id ) => {
    const updated = await faunaClient.query(
        q.Update(
          q.Ref(q.Collection('drafts'), _id),
          { data: { id, version, rows } },
        )
      );

      updated._id = updated.ref.id;

      delete updated.ref;

      return updated;
};

//delete a draft
const deleteDraft = async (_id) => {
    return await faunaClient.query(
        q.Delete(q.Ref(q.Collection('drafts'), _id))
    );
};


module.exports = {
    createPost,
    getPosts,
    // getPostsByUser,
    getPostById,
    updatePost,
    deletePost,
    createDraft,
    // getDraftsByUser,
    getDraftById,
    updateDraft,
    deleteDraft
};