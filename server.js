const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser=require('body-parser');
// console.log(process.env.port);
const port = process.env.port || 4000;
app.use(bodyParser.json());
const Joi = require('joi');
// app.get('/api/:games', (req, res) => {

//   res.json(req.params);
// });


// app.get('/api/:games', (req, res) => {
//   res.json(req.params)
// });

// app.get('/api/:games/:author', (req, res) => {
//   res.json(req.params)
// });

// app.get('/api/:games/:author', (req, res) => {
//   res.json(req.params.games);
// });

// app.get('/api/:games/:author', (req, res) => {
//   res.json([req.params.games,req.query.dob]);

// });

let usersData = [
  {
    id: 101,
    username: "Ajit Pandey",
    address:'Gopalganj',
    email:"ajitpandey77040@gmail.com",
    contact:7379537424

  },
  {
    id: 102,
    username: "Deepak",
    address:'Ali nagar ,gorakhpur',
    email:"rudra901@gmail.com",
    contact:7896329173
  },
  {
    id: 103,
    username: "Nirmal  giri",
    address:'buxipur ,gorakhpur',
    email:"nirmalgiri420@gmail.com",
    contact:9006522725
  },
  {
    id:104,
    username: "Abhimanyu",
    address:'rustampur,gorakhpur',
    email:"ramugupta808118@gmail.com",
    contact:7010246366
  }
];

app.get('/user/find/:index', (req, res) => {
  // res.json([req.params.index]);
  const schema=Joi.object({
    index:Joi.number().min(100).max(104).required()
  });
  const validation=schema.validate(req.params);
  if(validation.error){
    res.status(403).json(validation.error.message);
  }
  Inc_user = usersData.find((u) => u.id == req.params.index);
  if (!Inc_user) {
    res.json("404 error not  found")
  }
  else {
    res.json(Inc_user)
  }

});

// app.get('/user/games', (req, res) => {
//   res.json(games);
// });
app.post('/user/add', (req, res) => {
  const schema=Joi.object({
    username:Joi.string().min(3).max(26),
    address:Joi.string().min(10).max(25),
    email:Joi.string().email({
      maxDomainSegments:2,
      tlds:{allow:['com','net']}
    }),
    contact:Joi.number().min(10).required()
  });
  validation=schema.validate(req.body);
  if(validation.error){
    res.status(403).json(validation.error.message)
  }
  let newUser = {
    id: usersData[usersData.length-1].id + 1,
    username: req.body.username,
    address:req.body.address,
    email:req.body.email,
    contact:req.body.contact
  }
  usersData.push(newUser);
  console.log(newUser);


  res.json(usersData);
});
// app.post('/user/update', (req, res) => {
//   let newUser = {
//     id: games.length + 1,
//     username: req.body.name,
//     address:req.body.address,
//     email:req.body.email,
//     contact:req.body.contact
//   }
//   usersData.push(newUser);


//   res.json(usersData);
// });
//deletiong a user by query parameter
app.delete('/user/delete', (req, res) => {
  let IndexOfDeletingItems = parseInt(req.query.id);
  console.log(IndexOfDeletingItems);
  let findUser = usersData.find((user) => {
    if (user.id === IndexOfDeletingItems) {
      return user;
    }
  });
  if (findUser) {
    ind = usersData.indexOf(bo);
    usersData.splice(ind, 1);
    res.json(usersData);
  }
  else {
    res.json("404 not found user");
  }

});


//put method is used to update some elements
app.put('/user/update/:id', (req, res) => {
  //incoming id through request params
  Inc_id = parseInt(req.params.id);
  //incoming name
  
  // validate incoming name
  if (Inc_name.length < 3) {
    // bad request status code 403
    res.status(403).json("Name have atleast 3 character");
  }
  //retieve and finding the game to update

let  Ext_user=usersData.find((g)=>g.id===(Inc_id))
//   for (let index = 0; index < games.length; index++) {
//     if (games[index].id === Inc_id) {
//       Ext_game = games[index];
//       break;
//     }
//   }
Inc_name = req.body.name||Ext_user.username;
  Inc_address = req.body.address
  Inc_email = req.body.email
  Inc_contact = req.body.contact
  //validate game 
  if (!Ext_user) {
    res.status(503).json("unable to update ")
  }
  Ext_user.name = Inc_name
  res.json(games)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});