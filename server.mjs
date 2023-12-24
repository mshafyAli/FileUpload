import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import userRoutes from './api/routes/user.routes.js'

const PORT = process.env.PORT || 5000;

async function run(){
    try{
        await mongoose.connect(process.env.MONGO)
        console.log('Successfully connected to MongoDB');
    }catch(e){
        console.log(e);
        await mongoose.disconnect();
        process.exit(1);
    }
}
    run().catch(console.dir)
     process.on('SIGINT', async () => {
        console.log('app is terminating');
        await mongoose.disconnect();
        process.exit(0);
        
});

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json());
app.use(express.static("client"))
app.use('/api/user',userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });