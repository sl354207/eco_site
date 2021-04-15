const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY });

const q = faunadb.query;

const getCustomers = async () => {
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('customers'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    );

    const customers = data.map((customer) => {
        customer.id = customer.ref.id;

        delete customer.ref;

        return customer;
    });

    return customers;
};

const createCustomer = async (id, version, rows) => {
    return await faunaClient.query(
        q.Create(q.Collection('customers'), {
            data: { id, version, rows },
        })
    );
};

const getCustomer = async () => {
    const customer = await faunaClient.query(
        q.Get(q.Ref(q.Collection("customers"), "295675458544992770")));
    
    customer.id = customer.ref.id;

    delete customer.ref;
    
    return customer;
}


module.exports = {
    getCustomers,
    createCustomer,
    getCustomer
};