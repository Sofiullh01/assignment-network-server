const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const port = 5000



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.upyz80t.mongodb.net/?retryWrites=true&w=majority`;

// MOngodb Connection
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    await client.connect();
 

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

// pass: FnvKXOzOA9gs5dJl user: assignment-project

app.post('/api/v1/addassignments', (req,res)=>{
  res.send('it is working')
})

app.listen(port, () => {
  console.log(`Assignment on port ${port}`)
})
