const jwt=require('jsonwebtoken')
const UserModal=require('../Models/User')


const CheckUserAuth=async(req,res,next)=>{
    //console.log("hello user")
    const{token}=req.cookies
    // console.log(token)
    if(!token){
        req.flash('error','Unauthorized user, Please Login!')
        return res.redirect('/')
    }
    else{
        const verify_token=jwt.verify(token,'kishanmehta12')
        const data=await UserModal.findOne({_id:verify_token.id})
        //console.log(data)
        req.user=data
        //console.log(verify_token)
        next()
    }
}
module.exports=CheckUserAuth