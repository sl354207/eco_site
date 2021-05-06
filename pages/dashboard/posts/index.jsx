import  useSWR  from 'swr'


import  PostList  from '../../../components/PostList'

// pass in posts from database as a prop
export default function PostsByUser() {
    // retrieve posts from posts api. convert swr data to name posts.

    // UPDATE TO GETPOSTSBYUSER
    const { data: posts} = useSWR('/api/getPostsByUser')
    // console.log(posts);

    if (!posts) return "Loading...";

    return (
        <div>
        {/* pass in posts data as a prop */}
        <PostList posts={posts}/>
        </div>
    )
}