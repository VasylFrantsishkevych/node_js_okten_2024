import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import {  IUser, IUserListQuery, IUserListResponse } from "../interfaces/user.interfsce";
import { userPresenter } from "../presenters/user.presenter";
import { userRepository } from "../repositories/user.repository";

class UserService {
   public async getList(query: IUserListQuery): Promise<IUserListResponse> {
      const [entities, total] = await userRepository.getList(query);
      return userPresenter.toListResDto(entities, total, query);
    }

   public async getById(userId: string): Promise<IUser> {
      const user = await userRepository.getById(userId);
      if (!user) {
         throw new ApiError(`User with ID: ${userId} no exist!`, 404);
      }

      return user;
   }

   public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
      const user = await userRepository.getById(jwtPayload.userId);
      if (!user) {
         throw new ApiError(`User with ID: ${jwtPayload.userId} no exist!`, 404);
      }

      return user;
   }

   public async updateMe(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
      return await userRepository.updateById(jwtPayload.userId, dto);
   }

   public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
      await userRepository.delete(jwtPayload.userId);
   }
}

export const userService = new UserService();