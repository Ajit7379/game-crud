const express =require('express');
const{MongoClient ,ObjectId}=require('mongodb');
const app=express();
app.use(express.json());

const url ="mongodb://127.0.0.1:27017";
const client=new MongoClient(url);
const db=client.db('mydb');
const Joi=require('joi')

app.get('/api/game',async(req,res)=>{

    try{
        const game=await db.collection('games').find().toArray()
        res.json(game);
        client.close();
    }catch(error){
        res.json([error,"connection error"])
    }

})
// //Insertone Validation
// app.post('/api/game/add',async(req,res)=>{
//     const games=await db.collection('games').find().toArray();

//     const index=games.length

//    let new_game={
//         id:games[index-1].id+1,
//         name:req.body.name
//     }
//     db.collection('games')
//       .insertOne(new_game)
//       .then(res=>console.log(res))

//       const addGame=await db.collection('games')
//                             .find().toArray();
//                             res.json(addGame);


// })


app.post('/api/game',(req,res)=>{

    const schema = Joi.object({
        id:Joi.required(),
        name:Joi.string().min(3).max(10).required()

    });
    const validation = schema .validate(req.body);

    if(validation.error){
        res.json('Error:'+validation.error);
    }else{
        data={
            id:req.body.id,
            name:req.body.name
        };
        client.db('mydb')
        .collection('games')
        .insertOne(data)
        .then((res)=>{
            console.log(res);
            client.close();
        })
        .catch(err=>console.log(err));
        res.json(data)
    }
})

//Update Validation
//  /101

app.put('/api/game/:id',async(req,res)=>{
    //Joi validation
    const schema=Joi.object({
        name:Joi.string().min(3).max(20).required(),

    })
    const validation = schema.validate(req.body);
    if(validation.error){
        res.json(validation.error.message);

    }

    //request parameter
    id = parseInt(req.params.id);
    const game = await db.collection('games')
               .findOne({id : id })

    if (game) {
        db.collection('games')
          .updateOne({id : id},{
           $set:{
             name :req.body.name
           }    
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    res.json('game is updated')
    } else {
        res.json("game is not found")
    }  
})

//Deleting a data from database by query parameter{id}

//http://localhost:2000/api/game/delete?id=id_name

app.delete('/api/game/delete',async(req,res)=>{
   let Id =parseInt(req.query.id);
    if(await db.collection('games').findOne({id :Id})){
        db.collection('games')
          .deleteOne({id:Id})
          .then(res=>console.log(res))
          .catch(err=>console.log(err));

          res.json('Game is Deleted');
    }else{
        res.json('403 not found');
    }
})

app.listen(2000,() =>{
    console.log('on port 2000');
})