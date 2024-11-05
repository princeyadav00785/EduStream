import express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT||5000;

app.use(express.json());
app.get('/',(req:Request,res:Response)=>{
    res.send(`Hello from the ${process.env.SERVICE_NAAME}`);
});

app.listen(PORT,()=>{
 console.log(`${process.env.SERVICE_NAME} is running on ${process.env.PORT}`);
});