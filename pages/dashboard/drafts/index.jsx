import  useSWR  from 'swr'


import  PostList  from '../../../components/PostList'

// pass in posts from database as a prop
export default function DraftsByUser() {
    // retrieve posts from posts api. convert swr data to name posts.

    // UPDATE TO GETDRAFTSBYUSER
    const { data: drafts} = useSWR('/api/getDraftsByUser')
    // console.log(posts);

    if (!drafts) return "Loading...";

    return (
        <div>
        {/* pass in posts data as a prop */}
        <PostList posts={drafts}/>
        </div>
    )
}