const mongoose=require('mongoose')

//define schema
const Userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required: true,
        }
    },
    role:{
        type: String,
        default:'user'
    }
},{timestamps:true})
//create collection
const UserModel=mongoose.model('user',Userschema)
module.exports=UserModel
