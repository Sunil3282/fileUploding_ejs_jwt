import express from 'express';
import authControler from '../controllers/authController';
const router = express.Router();

router.post('/signIn',authControler.signIn);
router.post('/signUp',authControler.signUp);

export default router