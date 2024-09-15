import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { IDtoUser } from "../interfaces/user.interfsce";
import { ApiError } from "../errors/api-error";

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
         const userId = Number(req.params.userId);

         if (Number.isNaN(userId) || userId < 0 || !Number.isInteger(userId)) {
            throw new ApiError('Wrong user Id', 400)
         }

         const user = await userService.getById(userId);
         res.json(user);
      } catch (e) {
         next(e)
      }
   }

   public async create(req: Request, res: Response, next: NextFunction) {
      try {
         const dto = req.body as IDtoUser
         const result = await userService.create(dto);
         res.status(201).json(result);
      } catch (e) {
         next(e)
      }
   }

   public async update(req: Request, res: Response, next: NextFunction) {
      try {
         const userId = Number(req.params.userId);
         const dto = req.body as IDtoUser;
         const userUpdate = await userService.update(userId, dto);
         res.status(201).json(userUpdate);
      } catch (e) {
         next(e);
      }
   }

   public async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const userId = Number(req.params.userId);
         await userService.delete(userId)

         res.sendStatus(204);
      } catch (e) {
         next(e);
      }
   }
}

export const userController = new UserController();