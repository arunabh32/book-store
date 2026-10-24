const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Book = require('./models/Book');
const User = require('./models/user');

//jwt config 

const JWT_SECRET = process.env.JWT_SECRET ||'dart-kite';
const JWT_EXPIRE = '7d';


mongoose.connect('mongodb://localhost:27017/ReatUser')
.then(()=> console.log('connected'))
.catch( err => console.log('error',err))

const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json());



app.get('/',(req,res)=>{
    res.send('hello port 3000');
});

app.get('/showbook',async(req,res)=>{
    const book = await Book.find({});
    console.log(book)
    return res.json(book)
});

app.get('/all',async (req,res)=>{
    const user = await User.find({});
    console.log(user)
    return res.json(user);
});

app.post('/addBook',async (req,res)=>{
    const book = await Book.create(req.body);
    console.log(book);
    return res.status(201).json(book);//what is this line saying?
});

app.post('/register' , async (req,res)=>{
try{
    const {user, password} = req.body;
    const existing = await User.findOne({user});
    if(existing){
        return res.status(409).json({message:'User Exists'});
    }
    const newUser = await User.create({user , password});
    const token = jwt.sign(
        {userId: newUser._id},
        JWT_SECRET,
        {expiresIn: JWT_EXPIRE}
    );
    return res.status(201).json({
        message: 'Registered Successfully',
        token,
        user:{id :newUser._id , user: newUser.user}
    });

} catch(err){
    console.log(err);
    return res.status(500).json({message:'server error'});
}
});

app.post('login',async(req,res)=>{
    try{    
        const {user, password } = req.body;
        const foundUser = User.findOne({user});
        if(!foundUser){
            return res.status(401).json({message:'User not found!'});

        }
        const isMatch = await bcrypt.compare(password,foundUser.password);

        if(!isMatch){
            return res.status(401).json({message:'invalid credentials'});
        }
        //sign jwt
        const token = jwt.sign(
            {userId :foundUser._id},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRE}
        );

        return res.json({
            message:'Logges in successfully',
            token,
            user:{id:foundUser._id,user:foundUser.user}
        });


    } catch(err){
        console.log(err);
        return res.status(500).json({message:'server Error'})

    }
});


app.listen(3000, ()=>{
    console.log('port 3000');
});