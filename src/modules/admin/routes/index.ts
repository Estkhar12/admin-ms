import express from 'express';
import { signup } from '../controllers/adminSignup';
import { login } from '../controllers/adminLogin';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

const adminRoter = router;
export default adminRoter;
