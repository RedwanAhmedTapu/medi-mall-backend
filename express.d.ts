import { Multer } from 'multer';

declare global {
    namespace Express {
      interface Request {
        file?: Express.Multer.File; // This tells TypeScript that the file may exist on the Request
      }
    }
  }
  