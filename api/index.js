import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import postRouter from './routes/postRoute.js';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

// .env file supposed to be ignored before pushing the code to public, but is allowed to pass through the push for local testing purpose.
mongoose.connect(process.env.AUTH_MONGODB).then(() => {
    console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

const app = express();

// Allow json as the input of the server
app.use(express.json());

app.use(cookieParser());

app.listen(8800, () => {
    console.log('Server running on port 8800');
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);


// Errors handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});