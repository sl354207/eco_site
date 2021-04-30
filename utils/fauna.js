const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY });

const q = faunadb.query;

// query database to get all posts
const getPosts = async () => {
    // map all posts from collection to data
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('published_posts'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    );
    
    // map posts so that id is converted to json
    const posts = data.map((post) => {
        post.id = post.ref.id;

        delete post.ref;

        return post;
    });

    return posts;
};

// add draft to database with specific format from editor with id, version, and rows as input data.
const createDraft = async (id, version, rows) => {
    return await faunaClient.query(
        q.Create(q.Collection('drafts'), {
            data: { id, version, rows },
        })
    );
};

// retrieve single draft from database, convert to proper json.
const getDraft = async () => {
    const draft = await faunaClient.query(
        q.Get(q.Ref(q.Collection("drafts"), "297303467265884676")));
    
    draft.id = draft.ref.id;

    delete draft.ref;
    
    return draft;
}


module.exports = {
    getPosts,
    createDraft,
    getDraft
};