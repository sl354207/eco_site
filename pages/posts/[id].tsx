import Meta from '../../components/Meta'

const { getPosts } = require('../../utils/mongodb');

const { getPostById } = require('../../utils/mongodb');

import Link from 'next/link'

//do I need to import react
import React, { useState } from 'react';

// The editor core
import Editor, { Value }    from '@react-page/editor';


// import the main css, uncomment this: (this is commented in the example because of https://github.com/vercel/next.js/issues/19717)
import '@react-page/editor/lib/index.css';

// The rich text area plugin
import slate from '@react-page/plugins-slate';

// Stylesheets for the rich text area plugin
// uncomment this
import '@react-page/plugins-slate/lib/index.css';

// image
import image from '@react-page/plugins-image';

// Stylesheets for the image plugin
import '@react-page/plugins-image/lib/index.css';

// The video plugin
import video from '@react-page/plugins-video';
import '@react-page/plugins-video/lib/index.css';

// The spacer plugin
import spacer from '@react-page/plugins-spacer';
import '@react-page/plugins-spacer/lib/index.css';

// The divider plugin
import divider from '@react-page/plugins-divider';

import EditorLayout from '../../components/EditorLayout';
import { Button } from '@material-ui/core';
import customImage from '../../plugins/customImage'



// Define which plugins we want to use.
const cellPlugins = [slate(),
    image,
    video,
    spacer,
    divider,
    customImage
  ];


// pass in post from data.js as prop and create page for each post
const post = ({ post }) => {
    // set post as value of editor
  const [value, setValue] = useState<Value>(post);
    
    return (
        <>
            <EditorLayout>
                <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} readOnly/>
            </EditorLayout>
            <Link href='/posts'>Go Back</Link>
        </>
    )
}

// fetch post data at build time
export const getStaticProps = async (context) => {
    // context allows us to fetch specific data points from data such as id
    const _id = context.params.id;

    const post = await getPostById(_id);
    
    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        }
    }
}

// build routing paths for each post at build time
export const getStaticPaths = async () => {
    
    const posts = await getPosts();
    

    // create array of ids of each post in posts
    const ids = posts.map(post => post._id)

    // create paths array with objects that follow structure given
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    

    // return a path for each post id. If no id return 404
    return {
        paths,
        fallback: false
    }
}



export default post