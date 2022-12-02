const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

const app = express()

app.use(cors());
app.use(express.json());


//pass: BT2JrBb9jHAvwdUr
//user : phone-seller


const uri = "mongodb+srv://phone-seller:BT2JrBb9jHAvwdUr@cluster0.ttiygsx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const usersCollection = client.db('phoneSeller').collection('users');

        app.get('/users', async(req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });
        app.post('/users', async(req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
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
