import { ApiError } from "../errors/api-error";
import { IDtoUser, IUser } from "../interfaces/user.interfsce";
import { userRepository } from "../repositories/user.repository";

class UserService {
   public async getAll(): Promise<IUser[]> {
      return await userRepository.getAll();
   }

   public async getById(userId: number): Promise<IUser> {
      const user = await userRepository.getById(userId);
      if (!user) {
         throw new ApiError(`User with ID: ${userId} no exist!`, 404);
      }

      return user;
   }

   public async create(dto: IDtoUser): Promise<IDtoUser> {
      if (dto.name.length < 2 || dto.name.length > 20) {
         throw new ApiError('Name mast be min 2 symbols and max 20 symbols', 400)
      }
      if (!dto.email.includes('@')) {
         throw new ApiError('Not valid email address!', 400)
      }
      if (dto.password.length < 6) {
         throw new ApiError('Not valid password', 400)
      }
      return await userRepository.create(dto);
   }

   public async update(userId: number, dto: IDtoUser): Promise<IDtoUser> {
      if (Number.isNaN(userId) || userId < 0 || !Number.isInteger(userId)) {
         throw new ApiError('Wrong user Id', 400)
      }

      if (dto.name.length < 2 || dto.name.length > 20) {
         throw new ApiError('Name mast be min 2 symbols and max 20 symbols', 400)
      }
      if (!dto.email.includes('@')) {
         throw new ApiError('Not valid email address!', 400)
      }
      if (dto.password.length < 6) {
         throw new ApiError('Not valid password', 400)
      }
      return await userRepository.update(userId, dto);
   }

   public async delete(userId: number): Promise<void> {
      if (Number.isNaN(userId) || userId < 0 || !Number.isInteger(userId)) {
         throw new ApiError('Wrong user Id', 400)
      }
      await userRepository.delete(userId);
   }
}

export const userService = new UserService();