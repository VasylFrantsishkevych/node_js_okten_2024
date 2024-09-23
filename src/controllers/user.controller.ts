import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { IUser } from "../interfaces/user.interfsce";
import { ITokenPayload } from "../interfaces/token.interface";

class UserController {
   public async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const users = await userService.getAll();
         res.json(users);
      } catch (e) {
         next(e)
      }
   }

   public async getById(req: Request, res: Response, next: NextFunction) {
      try {
         const userId = req.params.userId;

         const user = await userService.getById(userId);
         res.json(user);
      } catch (e) {
         next(e)
      }
   }

   public async getMe(req: Request, res: Response, next: NextFunction) {
      try {
         const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
         const user = await userService.getMe(jwtPayload);
         res.json(user);
      } catch (e) {
         next(e)
      }
   }

   public async updateMe(req: Request, res: Response, next: NextFunction) {
      try {
         const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
         const dto = req.body as IUser;
         const userUpdate = await userService.updateMe(jwtPayload, dto);
         res.status(201).json(userUpdate);
      } catch (e) {
         next(e);
      }
   }

   public async deleteMe(req: Request, res: Response, next: NextFunction) {
      try {
         const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
   
         await userService.deleteMe(jwtPayload)

         res.sendStatus(204);
      } catch (e) {
         next(e);
      }
   }
}

export const userController = new UserController();