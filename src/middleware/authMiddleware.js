import jwt from 'jsonwebtoken';
import {data} from '../config/env';
import catchAsync from '../util/catchAsync';
// import cookies from 'cookie-parser'

const veryfyToken = {};

veryfyToken.loginTokenVerification = catchAsync( async (req,res,next)=>{
    //  const tokenData = req.headers.authorization;
    const  cookie  = req.cookies
     const tokenData  = cookie.accesstoken;
      // console.log(tokenData);
    //  console.log(access-token);
    //const tokenData = req.cookies['access-token']
    //  console.log(tokenData);
     if(!tokenData){
        // return res.status(403).json({
        //     message: "TOKEN_NOT_PROVIDED!!"
        // });
        res.render('login')
     }else{
       //const  accessToken  = await tokenData.split(' ')[1]
       //console.log(accessToken);
       const decodedToken =  jwt.verify(tokenData,data.secret);
       if(!decodedToken){
        return res.status(500).json({
            message:"SOME_THING_WRONG!!"
        });
       }
       req.user = decodedToken;
        next();
     }
});

export default veryfyToken;
 