const { client } = require("../config/database");

/**
 * @param {import('express').Express} app
 */
async function run(app) {
    const db = client.db('myDatabase');
   const usersCollection = db.collection('usersCollection');
   
    try{
        app.get('/',(req,res)=> {
            res.send({message:"Server running"})
            console.log('Run Fn succesfully imported');
        })
        app.post('/users',async (req,res) => {
            const result = await usersCollection.insertOne(req.body)
            res.send(result)
        })
        app.get('/user', async(req,res) => {
            const auth = req.headers.authorization;
            console.log("Authorization:" , auth)
            const result = await usersCollection.find().toArray()
            res.send(result)
        })
    }
    catch{
        console.log("Something went wrong")
    }
}

module.exports = {run};