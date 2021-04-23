const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY });

const q = faunadb.query;

// query database to get all customers
const getCustomers = async () => {
    // map all customers from collection to data
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('customers'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    );
    
    // map customers so that id is converted to json
    const customers = data.map((customer) => {
        customer.id = customer.ref.id;

        delete customer.ref;

        return customer;
    });

    return customers;
};

// add customer to database with specific format from editor with id, version, and rows as input data.
const createCustomer = async (id, version, rows) => {
    return await faunaClient.query(
        q.Create(q.Collection('customers'), {
            data: { id, version, rows },
        })
    );
};

// retrieve single customer from database, convert to proper json.
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