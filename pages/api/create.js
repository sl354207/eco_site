import { createCustomer } from '../../utils/fauna';
export default async function handler(req, res) {
    const { firstName } = req.body;
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
    try {
        const createdCustomer = await createCustomer(
            firstName
        );
        return res.status(200).json(createdCustomer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
}