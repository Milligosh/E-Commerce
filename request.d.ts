import { Request } from 'express';
import User from './src/users/services/user.services'
//Extend the Request interface to include the user property
declare module 'express' {
  interface Request {
    user?: User;
    passedFiles?: {
      filesOver2MB: File[];
      filesUnder2MB: File[];
    };
  }
}