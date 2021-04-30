import { createDraft } from '../../utils/fauna';

// api endpoint to post a customer to the database
export default async function handler(req, res) {
    // body must be in same format as database query
    const { id, version, rows } = req.body;

    // only allow post method
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
    // try post request, if successful return response, otherwise return error message.
    try {
        const createdDraft = await createDraft(
            id,
            version,
            rows
        );

        return res.status(200).json(createdDraft);
    } catch (err) {
        console.error(err);
        
        res.status(500).json({ msg: 'Something went wrong.' });
    }
}