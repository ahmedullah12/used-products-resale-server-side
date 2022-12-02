const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
require('dotenv').config();

const port = process.env.PORT || 5000

const app = express();

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttiygsx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const usersCollection = client.db('phoneSeller').collection('users');
        const categoriesCollection = client.db('phoneSeller').collection('categories');
        const productsCollection = client.db('phoneSeller').collection('products');
        const bookingsCollection = client.db('phoneSeller').collection('bookings')
         

        app.get('/users', async(req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });
        app.post('/users', async(req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        app.get('/categories', async(req, res) => {
            const query = {}
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        });
        app.get('/products', async(req, res) => {
            const query = {};
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })
        app.post('/bookings', async(req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        app.get('/users/user', async(req, res) => {
            const email = req.query.email;
            const query = {email: email};
            const user = await usersCollection.findOne(query);
            res.send(user)
        })
        app.get('/users/sellers', async(req, res) => {
            const role = "seller";
            const query = {role: role};
            const seller = await usersCollection.find(query).toArray();
            res.send(seller)
        })
        app.get('/users/buyers', async(req, res) => {
            const role = "buyers";
            const query = {role: role};
            const seller = await usersCollection.find(query).toArray();
            res.send(seller)
        })
    } 
    finally{

    }

}
run().catch(err => console.log(err))

app.get('/', async (req, res) => {
    res.send("server is running")
})

app.listen(port, () => {
    console.log('server running on port ', port)
})
