
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title:{
        type:String,
        required:true
    },//linking books of existing authors(later)
    author:{
        type:String,
        required: true

    },
    price :{
        type:Number,
        required:true,
        default: 0 ,
        min : 0
    },
    stock:{
        type:Number ,
        required :true,
        default :0 ,
        min : 0 

    }
})
module.exports = mongoose.model('Book',BookSchema);