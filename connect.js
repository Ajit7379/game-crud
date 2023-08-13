const express = require('express');
require('dotenv').config();
const port=process.env.port//5000
const {MongoClient} = require('mongodb');
const app =express();

//NODE Code to implement DB Connectivity Using Mongodb
const url ="mongodb://localhost:27017";
const client = new MongoClient(url);

client.db('mydb')
      .collection('games')
      .find()
      .sort({name:1})
      .limit(3)
      .toArray()
      .then(res=>console.log(res))
      .catch(err=>console.log(err));

// find ()=> sort->asc
//----------------------------
// client.db('mydb')
// .collection('games')
// .find()
// .sort({name:-1})
// .toArray()
// .then(res=>console.log(res))
// .catch(err=>console.log(err)); 

// find ()=> sort->desc
// //----------------------------
//   client.db('mydb')
//       .collection('games')
//       .find()
//       .sort({name:-1})
//       .toArray()
//       .then(res=>console.log(res))
//       .catch(err=>console.log(err)); 



//Find => query
//===================
// query = {id:101};
// client.db('mydb')
//       .collection('games')
//       .find(query).toArray()
//       .then(res=>console.log(res))
//       .catch(err=>console.log(err));
// // find() => all
// // ==============
// client.db('mydb')
//       .collection('games')
//       .find().toArray()
//        .then(res=>console.log(res))
//        .catch(err=>console.log(err));

// //FindOne
// //======================
// client.db('mydb')
//       .collection('games')
//       .findOne()
//        .then(res=>console.log(res))
//        .catch(err=>console.log(err));

//Update Many
// client.db('mydb')
//       .collection('games')
//       .updateMany({id:101},{
//         $set:{
//          name:`Super Mario`
//         }
//       })
//        .then((res)=>{
//         console.log(res);
//         client.close();
//        })
//        .catch(err=>console.log('Error :'+err))
   
//UPDATE ONE
// client.db('mydb')
//       .collection('games')
//       .updateMany({id:101},{
//         $set:{
//          name:`Free Fire`
//         }
//       })
//        .then((res)=>{
//         console.log(res);
//         client.close();
//        })
//        .catch(err=>console.log('Error :'+err))

//Insert Many
// client.db('mydb')
//       .collection('games')
//       .insertMany([
//         {id:107,name:"Ludo King"},
//       {id:108,name:"Cheesh"},
//       {id:109,name:"puzzle"},
//       {id:110,name:"Car driver"},
//       ])
//       .then(res=>{
//         console.log(res);
//         client.close(); 
//       })
//       .catch(error=>{
//         console.log(error);
//       })

// //INSERT ONE
// client.db('mydb')
//       .collection('games')
//       .insertOne({
//         id:101,
//         name:'Temple Run'
//       })
//        .then((res)=>{
//         console.log(res);
//         client.close();
//        })
//        .catch(err=>console.log('Error :'+err))

//deleting one data from database
// client.db('mydb').collection('games')
//         .deleteMany({id:101})
//         .then(res=>{
//           console.log([res,"data has been deleted "]);
//           client.close();
//         })
//         .catch(error=>console.log(error))

// client.connect()
//      .then(()=>{
//         console.log("connnection successfull");
//         console.log("exited");
//         client.close();
//      })
//      .catch(error=>console.log(error));
     app.listen(port,()=>console.log('listing on port'+port));