// import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button } from '@material-ui/core'; 
// pass in post as prop from PostList which was created from posts data
const PostItem = ({post}) => {
    const router = useRouter();

    return (
        <div>
            <h3>{post._id}</h3>
            
            <Button onClick={()=>router.push(`/dashboard/drafts/${post._id}`)}>Edit</Button>
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

export default PostItem