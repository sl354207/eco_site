import { getDraftById } from '../../../utils/fauna'

export default async function handler(req, res) {
    // console.log(req.query);
    // const { test } = req.query
    // res.end(`Post: ${test}`)
    if (req.method !== 'GET') {
      return res.status(405);
    }

    const  _id  = req.query._id
    // console.log(typeof test)
    // console.log(req.query.test)
    // const { _id } = '297303467265884676';
    // console.log(_id);
    // console.log(req.body);
    // console.log(typeof req.query);
    // try get request, if successful return response, otherwise return error message
    try {
        const draft = await getDraftById(_id);

        return res.status(200).json(draft);
    } catch (err) {
        console.error(err);
        
        res.status(500).json({ msg: 'Something went wrong.' });
    }
  }