declare global {
  namespace Express {
    interface Request {
      userId?: string; // or the type you expect
    }
  }
}

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header= req.headers["authorization"];
  const decoded = jwt.verify(header as string , JWT_SECRET)

  if(decoded){
    //@ts-ignore
    req.userId = decoded.id;  // here req.userId will be sent in json as decode 
    //value from the database
    next()
  }else{
    res.status(400).json({
      message : "Incorrect Credentails"
    })
  }
};
