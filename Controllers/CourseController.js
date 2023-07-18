const CourseModel=require('../Models/Course')
const nodemailer=require('nodemailer')
class CourseController{

    static courseinsert = async(req,res)=>{
        try{
            const{name,image,course,_id,email}=req.user
            const data = new CourseModel({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                tenth:req.body.tenth,
                twelth:req.body.twelth,
                course:req.body.course,
                userid: _id
            })
            await data.save()
            this.SendEmail(course,email)
            res.redirect('/coursedisplay')
        }catch(error){
            console.log(error)
        }
    }
    static display = async(req,res)=>{
        try{
            const{name,image,_id}=req.user
            const data = await CourseModel.find({userid:_id})
           // console.log(data)
            res.render('course/display',{d:data,n:name,i:image})
        }
        catch(error){
            console.log(error)
        }
    }
    static view = async(req,res)=>{
        try{
            const{name,image,_id}=req.user
            //console.log(req.params.id)
            const data = await CourseModel.findById(req.params.id)
            res.render('course/view',{view:data,n:name,i:image})
        }
        catch(error){
            console.log(error)
        }
    }
    static edit = async(req,res)=>{
        try{
            const{name,image,_id}=req.user
            //console.log(req.params.id)
            const data = await CourseModel.findById(req.params.id)
            //console.log(data)
            res.render('course/edit',{edit:data,n:name,i:image})
        }catch(error){
            console.log(error)
        }
    }
    static update = async(req,res)=>{
        try{
            const{name,image,_id}=req.user
            // console.log(req.params.id)
            // console.log(req.body)
            
            const data = await CourseModel.findByIdAndUpdate(req.params.id,{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                tenth:req.body.tenth,
                twelth:req.body.twelth,
                course:req.body.course
            })
            res.redirect('/coursedisplay')
        }catch(error){
            console.log(error)
        }
    }
    static delete = async(req,res)=>{
        try{
            //console.log(req.params.id)
            const data = await CourseModel.findByIdAndDelete(req.params.id)
            //console.log(data)
            res.redirect('/coursedisplay')
        }catch(error){
            console.log(error)
        }
    }
    static SendEmail = async (course, email) => {
        
        // console.log(course)
        // console.log(email)
        
        // let transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: 'shreyanshmehta55@gmail.com',
        //         pass: 'iqcbohplzduecydz'
        //     },
        //   });
        
        //   // send mail with defined transport object
        //   let info = await transporter.sendMail({
        //     from: '"shreyanshmehta55@gmail.com" <shreyanshmehta55@gmail.com>', // sender address
        //     to: email, // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: `your course register successfully<b>${course}</b>`, // html body
        //   });
        
    
    }
}
module.exports=CourseController