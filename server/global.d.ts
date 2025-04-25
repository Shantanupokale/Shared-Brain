
// src/global.d.ts or src/types/global.d.ts

export {}; // Ensures this file is treated as a module.
declare global {
    namespace Express {
      interface Request {
        userId?: string; // or the type you expect
      }
    }
  }