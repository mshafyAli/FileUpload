import express from 'express';
import { registerUser } from '../Controllers/user.controller.js';
import upload from '../../multer.mjs';

const router = express.Router();

router.post('/register', upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]),registerUser)


export default router;