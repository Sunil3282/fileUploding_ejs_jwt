
import multer from "multer";
import path from 'path';


const fileStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,path.join(__dirname,'../assets/Images'))
    },
    filename:(req,file,cb) => {
        cb(null,Date.now() + '.' + file.originalname)
    }
})

const imageFilter = (req,file,cb)=>{
    const regex = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|svg|pdf|docx)$/;
    const originalname = file.originalname;
    if(originalname.match(regex)){
        cb(null,true);
    }else{
        cb(new Error ('you can only upload image files!!'), false)
    }
}

 const localUpload = multer({
    fileFilter : imageFilter,
    storage: fileStorage,
    limits : {
        fileSize: 1024*1024*25,
    },
})

export default localUpload;
