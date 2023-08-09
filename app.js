const express = require('express')
const app = express()
const port = 3000
const web=require('./routes/web')
const connectDB = require('./DB/connectdb')

const fileUpload=require("express-fileupload");
//Temp file uploader
app.use(fileUpload({useTempFiles: true}));

//to encode
app.use(express.urlencoded({extended:true}));
//connectDB
connectDB()

//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash');

//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser())

//messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }));
//Flash messages
app.use(flash());

//ejs set .... html ke liye
app.set('view engine','ejs')

//router path
app.use('/',web)

//static file
app.use(express.static('Public'))


//server start
app.listen(port, () => {
  console.log(`Server start on port localhost: ${port}`)
  //template string format to write string
})
// console.log(express)