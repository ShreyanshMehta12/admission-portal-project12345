const express = require('express')
const FrontController = require('../Controllers/FrontController')
const CourseController = require('../Controllers/CourseController')
const route = express.Router()
const CheckUserAuth=require('../Middleware/auth')
const AdminController = require('../Controllers/admin/AdminController')

//router
//frontcontroler
route.get('/',FrontController.login)
route.get('/registration',FrontController.registration)
route.get('/dashboard',FrontController.dashboard)
route.get('/home',CheckUserAuth,FrontController.home)
route.post('/verifylogin',FrontController.verifylogin)
route.get('/logout',FrontController.logout)
route.get('/profileupdate',CheckUserAuth,FrontController.profileupdate)
route.post('/changepassword',CheckUserAuth,FrontController.changepassword)
route.post('/updateprofile',CheckUserAuth,FrontController.updateprofile)
route.get('/contact',CheckUserAuth,FrontController.contact)
route.get('/changepass',CheckUserAuth,FrontController.changepass)
route.get('/about',CheckUserAuth,FrontController.about)
//route
route.post('/userinsert',FrontController.userinsert)

//CourseController
route.get('/coursedisplay',CheckUserAuth,CourseController.display)
route.post('/courseinsert',CheckUserAuth,CourseController.courseinsert)
route.get('/view/:id',CheckUserAuth,CourseController.view)
route.get('/edit/:id',CheckUserAuth,CourseController.edit)
route.post('/courseupdate/:id',CheckUserAuth,CourseController.update)
route.get('/courseupdate/:id',CheckUserAuth,CourseController.delete)

//AdminController
route.get('/admin/display',CheckUserAuth,AdminController.display)
route.get('/admin/course/view/:id',CheckUserAuth,AdminController.courseview)
route.get('/admin/course/delete/:id',CheckUserAuth,AdminController.coursedelete)
route.post('/updatestatus/:id',CheckUserAuth,AdminController.updatestatus)


module.exports=route
