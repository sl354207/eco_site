import  useSWR  from 'swr'
import { useRouter } from 'next/router'

import {getPostById} from '../../../utils/fauna'

// import  PostList  from '../../../components/PostList'

// pass in posts from database as a prop
export default function PostByUser() {
    // retrieve posts from posts api. convert swr data to name posts.
    // const _id = '297303467265884676';

    const router = useRouter();
    const  _id  = router.query._id;
    console.log(typeof id);

    // const fetcher = async (url, _id) => {
    //     const res = await fetch(url, {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({_id}),
    //     }),
    // }; 

    const fetcher = async (url) => {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
      }

    
    const { data: post} = useSWR(`/api/getposts/${_id}`)
    // const { data: draft } = useSWR(`/api/getDraftById?_id=${_id}`)
    // console.log(draft);

    if (!post) return "Loading...";

    return (
        <div>
        <h1>
            {post._id}
        </h1>
        </div>
    )
}