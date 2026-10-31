const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const {requireAuth , authorize} = require('../middleWare/auth');

router.get('/',async (req,res)=>{
    try {
        const books = await Book.find({});
        res.json(books);
    }catch(err){
        res.status(500).json({message:'server error'});
    }
});
router.post('/',requireAuth, authorize('admin'), async (req,res)=>{
    try{
        const book = await Book.create(req.body);
        res.status(201).json(book);
    }catch (err) {
        res.status(400).json({message:'coouldnot post the product'})
    }
})

router.put('/:id',requireAuth, authorize('admin'),async (req,res) =>{
    try{//findbyid and update config understanding?
        const book = await Book.findByIdAndUpdate(req.params.id, req.body,{new: true , runValidators:true });
        if(!book) return res.status(404).json({message :'Book not Found'});
        res.json(book);
    }
    catch(err){
        res.status(400).json({message: 'Update failed',error :err.message});
    }
})