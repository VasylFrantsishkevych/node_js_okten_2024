import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ApiError } from "../errors/api-error";

class CommonMiddleware {
   public isIdvalid(key: string) {
      return (req: Request, res: Response, next: NextFunction) => {
         try {
            if (!isObjectIdOrHexString(req.params[key])) {
               throw new ApiError('Invalid ID', 400);
            }
            next();
         } catch (e) {
            next(e);
         }
      }
   }

   public userBodyValid (typeValidation: any) {
      return (req: Request, res: Response, next: NextFunction) => {
         try {
            const validBody = typeValidation.validate(req.body);
            if (validBody.error) {
               throw new ApiError(validBody.error.message, 400)
            }
   
            next()
         } catch (e) {
            next(e)
         }
      }
   }
}

export const commonMiddleware = new CommonMiddleware();