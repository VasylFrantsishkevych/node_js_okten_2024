import { ApiError } from "../errors/api-error";
import { IDtoUser, IUser } from "../interfaces/user.interfsce";
import { getUsers, saveNewUser } from "../services/fs.service";

class UserRepository {
   public async getAll(): Promise<IUser[]> {
      return await getUsers();
   }

   public async getById(userId: number): Promise<IUser | null> {
      const users = await getUsers();
      return users.find(user => user.id === userId);
   }

   public async create(dto: IDtoUser): Promise<IDtoUser> {
         const users = await getUsers();

         const id = users.length ?  users[users.length - 1].id + 1 : 1;
         const newUser = { id, name: dto.name, email: dto.email, password: dto.password}
         users.push(newUser);

         await saveNewUser(users)
         return newUser;
   }  
   
   public async update(userId: number, dto: IDtoUser): Promise<IDtoUser> {
      const users = await getUsers();

      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
         throw new ApiError('User not found', 404);
      }

      const userUpdate = {name: dto.name, email: dto.email, password: dto.password}

      users[userIndex] = {...users[userIndex], ...userUpdate};

      await saveNewUser(users);
      return userUpdate;
   }

   public async delete(userId: number): Promise<void> {
      const users = await getUsers();

      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
         throw new ApiError('User not found', 404);
      }

      users.splice(userIndex, 1);

      await saveNewUser(users);
   }
}

export const userRepository = new UserRepository();