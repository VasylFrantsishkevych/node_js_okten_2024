import { ApiError } from "../errors/api-error";
import {  IUser } from "../interfaces/user.interfsce";
import { userRepository } from "../repositories/user.repository";

class UserService {
   public async getAll(): Promise<IUser[]> {
      return await userRepository.getAll();
   }

   public async getById(userId: string): Promise<IUser> {
      const user = await userRepository.getById(userId);
      if (!user) {
         throw new ApiError(`User with ID: ${userId} no exist!`, 404);
      }

      return user;
   }

   public async create(dto: IUser): Promise<IUser> {
      return await userRepository.create(dto);
   }

   public async update(userId: string, dto: IUser): Promise<IUser> {
      return await userRepository.update(userId, dto);
   }

   public async delete(userId: string): Promise<void> {
      await userRepository.delete(userId);
   }
}

export const userService = new UserService();