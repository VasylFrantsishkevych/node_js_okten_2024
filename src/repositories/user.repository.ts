import { IUser } from "../interfaces/user.interfsce";
import { User } from "../models/user.models";

class UserRepository {
   public async getAll(): Promise<IUser[]> {
      return await User.find({});
   }

   public async getById(userId: string): Promise<IUser | null> {
      return await User.findById(userId);
   }

   public async getByEmail(email: string): Promise<IUser | null> {
      return await User.findOne({ email }).select('+password');
    }

   public async create(dto: IUser): Promise<IUser> {
      return await User.create(dto);
   }  
   
   public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
      return await User.findByIdAndUpdate(userId, dto, {new: true});
   }

   public async delete(userId: string): Promise<void> {
      await User.deleteOne({_id: userId});
   }
}

export const userRepository = new UserRepository();