
//start server
import express from 'express';
import fs from 'fs';
import {Blog} from './Data/blog.js'
import {saveAccountData,getAccountData, savePost,updatePost} from './Service/services.js'
const dataPath = './Data/datamodel.json';
// create our express app
const app = express(); 
app.use(express.json());

// reading the data
app.get('/blog', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });


  app.post('/blog/addpost', (req, res) => {

    let data = savePost(req.body);
    res.send({success: true, msg: 'account data added successfully'})

})

// Read - get BY ID accounts from the json file
app.get('/blog/:id', (req, res) => {
  const accounts = getAccountData()
 // let readData = fs.readFileSync(dataPath);
  const objectWithDesiredId = accounts[req.params['id']];
  res.send(objectWithDesiredId)
})

// Update - using Put method
app.put('/blog/updatepost/:id', (req, res) => {
   let accountId = updatePost(req.body,req.params['id']);
    res.send(`accounts with id ${accountId} has been updated`)

});

//delete - using delete method
app.delete('/blog/deletepost/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existAccounts = getAccountData()

    const userId = req.params['id'];

    delete existAccounts[userId];  
    saveAccountData(existAccounts);
    res.send(`accounts with id ${userId} has been deleted`)
  }, true);
})

// app.use(
//     (err,req,res,next) => {
//     res.write("Something went wrong..."  + " " + err);
//     res.end();
// });

app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 
