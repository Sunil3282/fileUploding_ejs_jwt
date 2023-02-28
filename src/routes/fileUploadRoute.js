import express from "express";
import fileUploadController from "../controllers/fileUploadController";
import fileUpload from "../middleware/fileUploader";
import tokenVerification from '../middleware/authMiddleware'


const router = express.Router()

router.post('/uploadImage', tokenVerification.loginTokenVerification, fileUpload.single('image'), fileUploadController.fileUpload);

export default router;


