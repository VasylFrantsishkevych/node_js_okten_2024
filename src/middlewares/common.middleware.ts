import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ApiError } from "../errors/api-error";
import { ObjectSchema } from "joi";

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

   public isQueryValid(validator: ObjectSchema) {
      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          req.query = await validator.validateAsync(req.query);
          next();
        } catch (e) {
          next(new ApiError(e.details[0].message, 400));
        }
      };
   }
}

export const commonMiddleware = new CommonMiddleware();