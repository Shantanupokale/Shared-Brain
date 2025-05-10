// src/types/global.d.ts or types/express/index.d.ts

import { Request, Response, NextFunction } from 'express';

export {}; // Makes this a module

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Optional: reusable middleware type alias
export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;
