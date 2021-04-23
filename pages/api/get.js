// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getCustomers, getCustomer } from '../../utils/fauna';

// api endpoint to get all customers or a single customer from database
export default async function handler(req, res) {
    // only allow get request
    if (req.method !== 'GET') {
        return res.status(405);
    }
    // try get request, if successful return response, otherwise return error message
    try {
        const customers = await getCustomers();

        const customer = await getCustomer();

        return res.status(200).json(customer);
    } catch (err) {
        console.error(err);
        
        res.status(500).json({ msg: 'Something went wrong.' });
    }
}
