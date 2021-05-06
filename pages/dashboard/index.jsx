// import  useSWR  from 'swr'


// import  PostList  from '../../components/PostList'

import { useRouter } from 'next/router'

import { Button } from '@material-ui/core';

// pass in posts from database as a prop
export default function Dashboard() {
    // retrieve posts from posts api. convert swr data to name posts.
    // const { data: posts} = useSWR('/api/getPosts')
    // // console.log(posts);

    // if (!posts) return "Loading...";

    const router = useRouter();

    return (
        <div>
        {/* pass in posts data as a prop */}
        {/* <PostList posts={posts}/> */}
        <Button onClick={()=>router.push('/dashboard/posts')}>Posts</Button>
        <Button onClick={()=>router.push('/dashboard/drafts')}>Drafts</Button>
        </div>
    )
}

