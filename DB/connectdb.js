const mongoose=require("mongoose")

// Line 4 for Cloud DB
//const database="mongodb+srv://admission123:vikas123@cluster0.b0ibf.mongodb.net/blog?retryWrites=true&w=majority"

const url ="mongodb://0.0.0.0:27017/admissionportal1"
const live_url= "mongodb+srv://shreyanshmehta55:9575kishan@cluster0.ogf20xv.mongodb.net/admissionportal1?retryWrites=true&w=majority"



const connectDB=()=>{
    // For local DB
    return mongoose.connect(live_url)
    
    // For cloud DB
    // return mongoose.connect(database)
    
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports=connectDB