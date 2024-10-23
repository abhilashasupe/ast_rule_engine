import express from 'express'; 
import connectDB from './config/connect.js'; 

const app = express();
app.use(express.json());

import cors from 'cors'; 
app.use(cors());

import router from './routes/astRoutes.js';
app.use("/" , router)

import dotenv from 'dotenv';
dotenv.config();

const PORT = 3333;
const run = async()=>{
    try{
        await connectDB (process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log("server is running on port : ", PORT)            
        })
    }
    catch(error){
        console.log('Error starting the server:',error)
    }
}

run()