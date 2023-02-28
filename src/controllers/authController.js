import model from '../models';
// console.log(model);
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {data} from '../config/env'
import catchAsync from '../util/catchAsync';
import cookie from 'cookie-parser';
const {User}  = model;
// import nodemailer from 'nodemailer'

const authControler = {};

//mail sender details
// const transporte  = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user  : process.env.EMAIL,
//       pass  : process.env.PASSWORD,
//     },
//     tls :{
//       rejectUnauthorized : false
//     }
//   })


authControler.signUp =  catchAsync( async ( req,res,next)=>{
    
    const email = req.body.email;
    const name = req.body.name;
    const userData = await User.findOne({where:{email:email}});
    const password = await bcrypt.hash(req.body.password,12);
    
    if(userData){
           return  res.status(409).json({
            message: "Email is already exist"
        })
    };
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password : password,
    });
    // return  res.status(200).json({
    //     message:"User is Created Successfully!!"
    // })

    // send verification mail to user

    // var mailoptions = {
    //     from:`'verify your eail' <sb900019@gmail.com>`,
    //     to : email,
    //     subject: `SunilBhandari want to Verify Your Email!!`,
    //     html: `<h1>Thanyou Mr/Ms ${name}
    //     <a href = "http://${req.headers.host}"}>Verify Email</a>`

    // }

    // transporte.sendMail(mailoptions,(error,info)=>{
    //     if(error){
    //         console.log(error)
    //     }else{
    //         console.log("Email is verify Successfully!!")
    //     }
    // })

     return  res.render('login')
});

authControler.signIn = catchAsync( async(req,res,next) =>{
    const userData = await User.findOne({where:{email:req.body.email}});
    if(!userData){
        return res.status(404).json({
            message: "INVALID_USER!!"
        })
    }
    const token = jwt.sign({ userId: userData.id, email: userData.email, role: userData.userRole }, data.secret, {
        expiresIn: 86400,
      });
      res.cookie('accesstoken',token);
    if(!userData){
       return  res.status(404).json({
            message:"User Not Found"
        })
    }
    res.redirect('/')
    // return res.status(200).json({
    //     message:"signIn Successfully",
    //     token :token
    // })
});

export default authControler;