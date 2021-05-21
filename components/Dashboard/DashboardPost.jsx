// import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button } from '@material-ui/core'; 

import Link from 'next/link'
// pass in post as prop from DashboardPosts which was created from posts data
const DashboardPost = ({post}) => {
    const router = useRouter();

    const _id = post._id;
    
    // function to delete post by id
    const deletePost = async (_id) => {
        const res = await fetch('/api/deletePost', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(_id),
        });

        // reload page after deletion
        router.reload();
    }

    return (
        <div>
            <h3>{post._id}</h3>
            {/* push to draft url based on id */}
            {/* <Button onClick={()=>router.push(`/dashboard/drafts/${post._id}`)}>Edit</Button> */}
            <Link href='/dashboard/posts/[_id]' as={`/dashboard/posts/${post._id}`}>
                {/* add content and styling to PostItem */}
                <a>
                    <h3>Update &rarr;</h3>
                </a>
            </Link>
            <Button onClick={()=>deletePost(_id)}>Delete</Button>
        </div>
        


        // link to each post by id from data
        // <Link href='/post/[id]' as={`post/${post.id}`}>
        //     {/* add content and styling to PostItem */}
        //     <a className={postStyles.card}>
        //         <h3>{post.title} &rarr;</h3>
        //         <p>{post.excerpt}</p>
        //     </a>
        // </Link>
    )
}

export default DashboardPost