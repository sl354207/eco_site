import { updatePost } from '../../utils/fauna';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    // body must be in same format as database query
    const { id, version, rows, _id } = req.body;
    
    // try update request, if successful return response, otherwise return error message
    try {
        const updated = await updatePost(
            id,
            version,
            rows,
            _id
        );
        return res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
}