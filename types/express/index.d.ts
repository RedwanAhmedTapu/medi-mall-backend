// types/express/index.d.ts
export interface UserPayload {
  id: string;
  email: string;
  // other properties if needed
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Replace with your user type
    }
  }
}
