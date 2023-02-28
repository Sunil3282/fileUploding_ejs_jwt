
import express from "express";
import bodyParser from "body-parser";
import {data} from './config/env'
import authRoute from "./routes/authRoute";
import fileUploadRouter from "./routes/fileUploadRoute";
import tokenVerification from './middleware/authMiddleware'
import path from 'path'
import ejs from 'ejs';
// import nodemailer from 'nodemailer'
import cookie from 'cookie-parser';

const app = express();

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
//app.set('views','views')

app.use(express.static(path.join(__dirname,'public')));
let port = 5000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookie());
app.use(express.json());


// index page
app.get('/', function(req, res) {
      res.render('dashmode');
    });

app.get('/signInForm', function(req, res) {
    res.render('login');
  });
  app.get('/signUpForm', function(req, res) {
    res.render('register');
  });
  app.get('/logout', function(req, res) {
    res.clearCookie("accesstoken");
    res.redirect('/');
  });

  app.get('/uploadfile',tokenVerification.loginTokenVerification, function(req, res) {
    res.render('adminpanal');
  });
  app.get('/uploadfile', function(req, res) {
    res.render('adminpanal');
  });
 
  
app.use('/auth',authRoute);
app.use('/',fileUploadRouter);

app.listen(port,(req,res,next)=>{
    console.log(`Server in ${process.env.STATUS} running on ${port} port.`)
})