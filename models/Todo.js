const mongoose = require('mongoose');

const TodoSchema= new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    completed:{
        type:Boolean,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model('Todo',TodoSchema) 