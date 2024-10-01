import { IUser } from "../interfaces/user.interfsce";
import { Token } from "../models/token.models";
import { User } from "../models/user.models";

class UserRepository {
   public async getAll(): Promise<IUser[]> {
      return await User.find({});
   }

   public async getById(userId: string): Promise<IUser | null> {
      return await User.findById(userId).select("+password");
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

   public async findWithOutActivity(date: Date): Promise<IUser[]> {
      return await User.aggregate([
         {
            $lookup: {
               from: Token.collection.name,
               let: {userId: '$_id'},
               pipeline: [
                  {$match: {$expr: {$eq: ['$_userId', '$$userId']}}},
                  {$match: {createdAt: {$gt: date}}},
               ],
               as: 'tokens',
            }
         },
         {$match: {tokens: {$size: 0}}},
      ])
   }
}

export const userRepository = new UserRepository();