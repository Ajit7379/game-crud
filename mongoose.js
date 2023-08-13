
const express = require('express');
// require('dotenv').config();
const { mongoose, ObjectId } = require('mongoose')
const validator = require('validator')

const port = process.env.port || 4000;
const app = express();
app.use(express.json());

// mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
    .then(() => console.log('successfully connected'))
    .catch(error => console.error(error));
// creating games schema
const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!(value.length >= 3 && value.length <= 20)) {
                throw new Error('invalid lenght of name');
            }
        }
    },
    author: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!(value.length >= 3 && value.length <= 20)) {
                throw new Error('invalid lenght of author');
            }
        }
    },
    sale: {
        type: Boolean,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        // required:function() {
        //     // if(this.sale){

        //     // }
        //     // return games.sale
        // }
        // validate(value){
        //     if(!games.sale){
        //         console.log(value);
        //         // value=null;
        //         games.price=null;
        //         console.log(games.price);
        //     }
        // }
    },
    tags: {
        type: [String],
        enum: ['war', 'action', 'advanture', 'puzzel', 'racing ', 'sports', 'sooter'],
        required: true,
        validate(value) {
            if (value.length <= 1) {
                throw new Error('at least 2 tags')
            }
        }
    },
    authorEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    releaseDate: {
        type: Date,
        default: Date.now
    }
});
// creating model games
const games = mongoose.model('games', gameSchema);

// rest end point

//traversing game
app.get('/api/game', (req, res) => {
    games.find()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json(err))
})
app.get('/api/game/find', (req, res) => {
    // obId = new mongoose.Types.ObjectId(req.query.id)
    games.findById({ _id: req.query.id })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json(err))
})
// create end point 
app.post('/api/game', (req, res) => {
    const game = new games(req.body);
    game.save()
    res.status(200).json(game);

})
//findByIdAndUpdate Using Patch method
// app.patch('/api/game/:id',(req, res)=>{
//      games.findByIdAndUpdate({_id :req.params.id}),({name :req.body.name})
//      .then(result => res.status(200).json(result))
//      .catch(err => res.status(400).json(err))
// })
app.patch('/api/game/update', (req, res) => {

    allowedUpdates = ['name', 'price', 'sale', 'tags'];
    //updates =['name','price','sale','tags'];
    updates = Object.keys(req.body);
    console.log(updates);
    isAllowed = updates.every(update => allowedUpdates.includes(update));
    console.log(isAllowed);
    if (isAllowed) {
        games.findByIdAndUpdate({ _id: req.query.id }, req.body)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(400).json(err))
    } else {
        res.json('Update not allowed')
    }
});

// //findByIdAndDelete Delete Method
// app.delete('/api/game/:id',(req ,res)=>{
//     games.findByIdAndDelete({_id :req.params.id})
//     .then(result => res.status(200).json(result))
//     .catch(err => res.status(400).json(err))

// })

//Find by fillter 
app.get('/api/filter', (req, res) => {
    games.find({ sale: true, tags: ['action'] })
        .then(result => res.json(result)).catch(err => res.json(err))
})

// filter with sort
app.get('/api/filter/sort', (req, res) => {
    games.find({ sale: true, tags: ['action', 'war'] }).sort({ name: 1 }).then(result => res.json(result))
        .catch(err => res.json(err))
})

//filter with sorted on selected value
app.get('/api/fillter/selected', (req, res) => {
    games.find({ sale: true, tags: ['action', 'war'] }).sort({ name: 1 }).select({ name: 1, sale: 1, price: 1, })
        .catch(err => res.json(err))
})

// filter with sorted on selected value basis on price value
app.get('/api/fillter/price', (req, res) => {
    games.find({ sale: true, tags: ['action', 'war'],price:{$lt:400}}).sort({name: 1}).select({ name: 1, sale: 1, price: 1,})
        .catch(err => res.json(err))
})


app.listen(port, () => {
    console.log('server is listining on port ' + port);
})
