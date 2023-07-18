const UserModel=require('../Models/User')
const CourseModel=require('../Models/Course')
const bcrypt = require("bcrypt");
const cloudinary =require("cloudinary").v2;
const jwt=require('jsonwebtoken')
cloudinary.config({
    cloud_name:"dccjxejqv",
    api_key:"919419823113387",
    api_secret: "fXcGpgVPdl635BTq5JIItFP04b4",
    secure: false,
});
class FrontController{
    static login =async(req,res)=>{
        try{
            res.render("login",{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }
    static registration=async(req,res)=>{
        try{
            res.render("registration",{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }
    static dashboard =async(req,res)=>{
        try{
            const{name,image,_id}=req.user
            res.render("dashboard",{n:name,i:image})
        }catch(error){
            console.log(error)
        }
    }
    static home =async(req,res)=>{
        try{
            const{name,image,email,_id}=req.user
            const btech=await CourseModel.findOne({userid:_id,course:'btech'})
            const bca=await CourseModel.findOne({userid:_id,course:'bca'})
            const bba=await CourseModel.findOne({userid:_id,course:'bba'})
            res.render("home",{n:name,i:image,e:email,b:btech,bc:bca,bb:bba})
        }catch(error){
            console.log(error)
        }
    }
    static userinsert=async(req,res)=>{
        // console.log(req.files.image)
        const imagefile=req.files.image
        const imageupload=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'profileimage'
        })
        // console.log(imageupload)
        const {name,email,password,confirm_password}=req.body
        const user=await UserModel.findOne({email:email})
        // console.log(user)
        if(user){
            req.flash('error','Email already exist')
            res.redirect('/registration')
        }
        else{
            if(name && email && password && confirm_password){
                if(password==confirm_password){
                    try{
                        const hashpassword=await bcrypt.hash(password,10)
                        const result=new UserModel({
                        name: name,
                        email: email,
                        password: hashpassword,
                        image:{
                            public_id: imageupload.public_id,
                            url: imageupload.secure_url
                        }
                        })
                        await result.save()
                        res.redirect('/')
                            
                    }catch(error){
                        console.log(error)
                    }
                }
                else{
                    req.flash('error','Password and confirm password does not match')
                    res.redirect('/registration')
                }
            }
            else{
                req.flash('error','All Field are required')
                res.redirect('/registration')
            }
        }
     }
     static verifylogin=async(req,res)=>{
        try{
            // console.log(req.body)
            const{email,password}=req.body
            if(email && password){
                const user=await UserModel.findOne({email:email})
                if(user != null){
                   const ismatched = await bcrypt.compare(password,user.password)
                   if(ismatched){
                    //multiple login
                    if(user.role == 'user'){
                        //generate token
                      const token=jwt.sign({id: user._id},'kishanmehta12')
                      //console.log(token)
                      res.cookie('token',token)
                      res.redirect('/home')
                    }
                    if(user.role == 'admin'){
                        //generate token
                      const token=jwt.sign({id: user._id},'kishanmehta12')
                      //console.log(token)
                      res.cookie('token',token)
                      res.redirect('/admin/display')
                    }
                   }
                   else{
                      req.flash('error','Email and Password is not valid')
                      res.redirect('/')
                   }
                }
                else{
                    req.flash('error','you are not a registered user')
                    res.redirect('/')
                }
            }
            else{
                req.flash('error','All Field are required')
                res.redirect('/')
            }
        }catch(error)
        {
            console.log(error)
        }
     }
     static logout =async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect("/")
        }catch(error){
            console.log(error)
        }
    }
    static changepass =async(req,res)=>{
        try{
            const{name,image,_id,email}=req.user
            res.render('changepass',{n:name,i:image,e:email,message: req.flash('error'),message2: req.flash('success')})

        }catch(error){
            console.log(error)
        }
    }
    static profileupdate =async(req,res)=>{
        try{
            const{name,image,_id,email}=req.user
            res.render('profileupdate',{n:name,i:image,e:email,message: req.flash('error'),message2: req.flash('success')})

        }catch(error){
            console.log(error)
        }
    }
    static changepassword =async(req,res)=>{
        try{
            const{name,image,_id,email}=req.user
            const{oldpassword,newpassword,cpassword}=req.body

            if(oldpassword && newpassword && cpassword){
                const user=await UserModel.findById(_id)
                const ismatch=await bcrypt.compare(oldpassword,user.password)
                if(!ismatch){
                    req.flash('error','Old Password is not match')
                    res.redirect('/changepass')    
                
                }else{
                    if(newpassword!==cpassword){
                        req.flash('error','Password and Conform Password does not match')
                        res.redirect('/changepass')
                    }else{
                        const newHashPassword=await bcrypt.hash(newpassword,10)
                        await UserModel.findByIdAndUpdate(_id,{
                            $set:{password:newHashPassword},
                        });
                        req.flash('success','Password changed successfully')
                        res.redirect('/changepass')
                    }
                }
            }else{
                req.flash('error','All Field are required')
                res.redirect('/changepass')
            }

            // console.log(req.body)
        }catch(error){
            console.log(error)
        }
    }
    static updateprofile = async (req, res) => {
        try {
            //console.log(req.files.image)
            if (req.files) {
                const user = await UserModel.findById(req.user.id);
                const image_id = user.image.public_id;
                await cloudinary.uploader.destroy(image_id);
    
                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "studentimage",
    
                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,
    
                }
            }
            const update_profile = await UserModel.findByIdAndUpdate(req.user.id, data)
            res.redirect('/profileupdate')
        } catch (error) {
            console.log(error)
        }
    }
    static contact =async(req,res)=>{
        try{
            const{name,image,email,_id}=req.user
            res.render("contact",{n:name,i:image,e:email})
        }catch(error){
            console.log(error)
        }
    }
    static about =async(req,res)=>{
        try{
            const{name,image,email,_id}=req.user
            res.render("about",{n:name,i:image,e:email})
        }catch(error){
            console.log(error)
        }
    }
}
module.exports=FrontController