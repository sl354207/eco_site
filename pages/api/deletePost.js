import { deletePost } from '../../utils/fauna';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    console.log(req.body);
    console.log(req.body._id);
    const { _id } = req.body;
    console.log(_id);
    try {
        const deleted = await deletePost(_id);
        return res.status(200).json(deleted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
}