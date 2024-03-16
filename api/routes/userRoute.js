import express from 'express';
import { test } from '../controllers/userController.js';


const userRouter = express.Router();

// Other routes can be added here for more functionalities, Such as: updating user info, delete user, etc.
userRouter.get('/test', test);

export default userRouter;