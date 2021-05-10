// import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button } from '@material-ui/core'; 
// pass in post as prop from PostList which was created from posts data
const DashboardPost = ({post}) => {
    const router = useRouter();

    const _id = post._id;
    console.log(_id);
    console.log(typeof _id)
    const deletePost = async (_id) => {
        const res = await fetch('/api/deletePost', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(_id),
        });
        router.reload();
    }

    return (
        <div>
            <h3>{post._id}</h3>
            
            <Button onClick={()=>router.push(`/dashboard/posts/${post._id}`)}>Edit</Button>
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