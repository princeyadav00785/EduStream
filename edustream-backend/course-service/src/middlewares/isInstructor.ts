import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const axios = require('axios');

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const prisma = new PrismaClient();

export const isProfessor= async(req:AuthenticatedRequest,res:Response, next :NextFunction):Promise<void>=>{
  const role=req?.user?.role;

  if(role==="STUDENT"){
    console.log("user is a student!!, not permitted..")
    res.status(403).json({message:"You are not authorised to create-session."})
    return;
  }else {
    next();
  }
}


export const isInstructor =  (req: Request, res: Response, next: NextFunction)=> {
};


export const authMiddleware = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => { 
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  console.log("inside middleware..");
  try {
    //  will Call the Auth Validation Microservice, would going to add this in all microservice...
    const response =  await axios.post(
      "http://localhost:5004/api/validate-token", 
      {}, 
      { headers: { Authorization: token } }
    );
    // console.log(response);
    if (response.data.valid) {
      req.user = { id: response.data.userId, role: response.data.role }; 
      // console.log(`role of user : ${req.user.id}, ${req.user.role}`);
      next();
    } else {
     return res.status(403).json({ error: "Invalid token" });
     
    }
  } catch (err) {
    return res.status(403).json({ error: `Token validation failed: ${err}` });
    
  }
};

