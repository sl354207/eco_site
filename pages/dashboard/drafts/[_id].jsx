import  useSWR  from 'swr'

import {getDraftById} from '../../../utils/fauna'

// import  PostList  from '../../../components/PostList'

// pass in posts from database as a prop
export default function DraftByUser() {
    // retrieve posts from posts api. convert swr data to name posts.
    const _id = '297303467265884676';

    const fetcher = async (url, _id) => {
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({_id}),
        }),
    }; 

    
    const { data: draft} = useSWR(['/api/getDraftById', _id], fetcher)
    console.log(draft);

    if (!draft) return "Loading...";

    return (
        <div>
        <h1>
            {draft._id}
        </h1>
        </div>
    )
}