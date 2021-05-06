// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDraftById } from '../../utils/fauna';

// api endpoint to get draft by id from database
export default async function handler(req, res) {
    // only allow get request
    if (req.method !== 'GET') {
        return res.status(405);
    }

    // const { _id } = req.body;
    // console.log(_id);
    // console.log(req.body);
    // try get request, if successful return response, otherwise return error message
    try {
        const draft = await getDraftById(_id);

        return res.status(200).json(draft);
    } catch (err) {
        console.error(err);
        
        res.status(500).json({ msg: 'Something went wrong.' });
    }
}