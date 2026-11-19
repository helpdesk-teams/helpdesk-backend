import express from 'express';
const router = express.Router();
import { login } from '../controllers/auth/login.controller.js';
import { signup } from '../controllers/auth/signup.controller.js';

router.post('/signup', signup);
router.post('/login', login);
export default router; 