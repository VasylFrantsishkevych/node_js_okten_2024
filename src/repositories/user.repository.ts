import { IUser } from "../interfaces/user.interfsce";
import { User } from "../models/user.models";

class UserRepository {
   public async getAll(): Promise<IUser[]> {
      return await User.find({});
   }

   public async getById(userId: string): Promise<IUser | null> {
      return await User.findById(userId);
   }

   public async create(dto: IUser): Promise<IUser> {
      return await User.create(dto);
   }  
   
   public async update(userId: string, dto: IUser): Promise<IUser> {
      return await User.findByIdAndUpdate(userId, dto, {new: true});
   }

   public async delete(userId: string): Promise<void> {
      await User.deleteOne({_id: userId});
   }
}

export const userRepository = new UserRepository();