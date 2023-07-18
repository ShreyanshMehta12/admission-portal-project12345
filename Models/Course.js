const mongoose=require('mongoose')

//define schema
const Courseschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    tenth:{
        type:String,
        require:true
    },
    twelth:{
        type:String,
        require:true
    },
    course:{
        type:String,
        require:true
    },
    userid:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Pending'
    },
    comment:{
        type:String
    }
},{timestamps:true})
//create collection
const CourseModel=mongoose.model('Course',Courseschema)
module.exports=CourseModel
