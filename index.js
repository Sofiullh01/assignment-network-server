const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const port = process.env.PORT ||5000

// Allow requests from http://localhost:5173

app.use(cors())
app.use(express.json())



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
    await client.connect();

    const assignmentCollection = client.db('allAssignments').collection('assignments');
    const submitCollection = client.db('allAssignments').collection('submit')
 

    // assignment 
    app.get('/api/v1/assignments', async(req,res)=>{
      console.log(req.query.cetagory);
      let qurey = {};
      if(req.query?.cetagory){
        qurey = {cetagory: req.query.cetagory}
      }
      const cursor = assignmentCollection.find(qurey);
      const result = await cursor.toArray();
      res.send(result)
    });
    
    app.get('/api/v1/assignments/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const options = {
        projection: { title: 1, thumbnail: 1, email: 1,dueDate:1,cetagory:1,marks: 1},
      };
      const result = await assignmentCollection.findOne(query,options);
      res.send(result)
    })

    app.post('/api/v1/addassignments', async (req, res) => {
      const assignment = req.body;
      console.log(assignment);
      const result = await assignmentCollection.insertOne(assignment);
      res.send(result)
    });
    // submit
    app.post('/api/v1/addassignments/submit',async(req,res)=>{
      const submit = req.body;
      console.log(submit)
      const result = await submitCollection.insertOne(submit);
      res.send(result)
    })

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


app.listen(port, () => {
  console.log(`Assignment on port ${port}`)
})
