const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Schema for foods collection

const foodSchema = new mongoose.Schema({
    name:String,
    calories:Number,
    protein:Number,
    carbs:Number,
    fats:Number,
    fibre:Number,
    weight:Number,

})

const foodModel = new mongoose.model("foods",foodSchema)

// Mongo Connection

mongoose.connect("mongodb://127.0.0.1:27017/nutrition", {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("Connected");
})

app.post("/food/create",(req,res) => {
    const food = req.body;
    let foodObj = new foodModel(food);
    foodObj.save().then(() => {
        res.send({status:"food stored"});
    })
 
    
})

app.get("/foods",async (req,res) => {
    let foods = await foodModel.find();
    res.send({foods:foods});

})

app.listen(8000);


// app.get('/demo',(req,res) => {
//     console.log("get request called");
//     res.send("response is done");
// });
