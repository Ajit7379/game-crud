const express =require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const port = process.env.port || 5000;


// app.get('/api',(req,res)=>{
//     res.json('Greetings from Api request Server!!');
// });

// app.get('/api/games',(req,res)=>{
//     res.json(req.params);
// });

// app.get('/api/:games',(req,res)=>{
//     res.json(req.params);
// });


// app.get('/api/:games/:author',(req,res)=>{
//     res.json(req.params);
// });


// app.get('/api/:games/:author',(req,res)=>{
//     res.json(req.params.games);
// });

// http://localhost:4000/api/pandey/ajit
// app.get('/api/:games/:author',(req,res)=>{
//     res.json([req.params]);
// });

// http://localhost:4000/api/pandey/ajit
// app.get('/api/:games/:author',(req,res)=>{
//     res.json(req.params.author);
// });

// http://localhost:4000/api/pandey/ajit?dob=2000
// app.get('/api/:games/:author',(req,res)=>{
//     res.json([req.params,req.query]);
// });


// http://localhost:4000/api/pandey/ajit?dob=2000&shadi=unshadi
// app.get('/api/:games/:author',(req,res)=>{
//     res.json([req.params,req.query]);
// });


// app.get('/api/:games/:author',(req,res)=>{
//     res.json([req.params.author,req.query.shadi]);
// });



// app.get('/api/games',(req,res)=>{
//     res.json(games);
// });

//http://localhost:4000/api/game/1
// app.get('/api/game/:id',(req,res)=>{
//     var id = req.params.id;

//     var game = games.find((g)=>g.id === parseInt(id));
//     if(!game){
//         res.status(404).json({error:'No Game Found!!!'});
//     }

//     res.json(game);

// });


// app.get('/api/game',(req,res)=>{
//     res.json(games);
// });


// app.get('/api/game/:id',(req,res)=>{
//     var id= req.params.id;

//     var game = games.find((g)=>g.id === parseInt(id));
//     if (!game){
//         res.status(505).json({error:'No Game Found!!!'});
//     }

//     res.json(game);
// })

// Post => TO create a new game

// app.post('/api/game',(req,res)=>{
//     game={
//         id:games.length+1,
//         name:req.body.name
//     };
//     games.push(game);
//     res.json(games)
// })

games = [
    {
        id:1,
        name:"Super Mario"
    },
    {
        id:2,
        name:"Pubg"
    },
    {
        id:3,
        name:"Candy Crush" 
    },
    {
        id:4,
        name:"Temple Run" 
    },
    
    {
        id:5,
        name:"Ludo" 
    }
];


app.delete('/api/:id',(req,res)=>{
    id = req.query.id;
    game = games.find((g)=>g.id === parseInt(id));
    index = games.indexOf(game);
    games.splice(index,1);
    res.json(games);
});

app.put('/api/game/:id',(req, res)=>{
    //retrieve game data to update
    inc_name = req.body.name; // cany_crush
    // res.json(inc_name);

    //validate name
    if(inc_name.length<3){
        res.status(403).json('Game Name Must Be Of Minimum 3 chars...')
    }

    //retrieve game id which to update 
    id=req.params.id; //1
    // res.json(id);

    // find the game to update
    ext_game = games.find((g)=>g.id===parseInt(id)); // {id:1, name:super mario}
// res.json(ext_game);
// check for existing game
if(!ext_game){
    res.status(503).json('Game To Update Not Found...');
}

// Update the game 
ext_game.name = inc_name;
//send response
res.json(games);


});

app.put('/api/game/:id',(req, res) =>{
    //retreve game data to update
    //Joi Server Side Validation
    const schema = Joi.object({
        name:Joi.string().min(3).max(20).required(),
        //password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    const validation = schema.validate(req.body);
    if(validation.error){
        res.json(validation.error.message);
    }
});

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})