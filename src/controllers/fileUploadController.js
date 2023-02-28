import model  from '../models';
import path from 'path';
import catchAsync from '../util/catchAsync'

const { FileUpload} = model;


const fileUploadController = {}

fileUploadController.fileUpload = catchAsync( async (req,res,next) => {
  console.log(req.file);
     const extName = path.extname(req.file.originalname)
     
    if(!req.file){
        return res.json({
            message:"Please Select Image File!!"
        })
    }
    //console.log(req.file);
    const fileData = {
        extension: extName,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        fileName: req.file.filename
    }

   // console.log(fileData);

     const newFile = await FileUpload.create(fileData)
      return res.status(201).json({
        message:"File Upload successfully!!",
      })
});
export default fileUploadController;