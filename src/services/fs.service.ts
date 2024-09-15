import fs from 'node:fs/promises';
import path from 'node:path';
import { IUser } from '../interfaces/user.interfsce';

const filePath = path.join(process.cwd(), 'src', 'db', 'users.json');

const getUsers = async (): Promise<IUser[]> => {
   try {
      const buffer = await fs.readFile(filePath);
      const data = buffer.toString();
   
      const users = data ? JSON.parse(data) : [];
      return users;
   } catch (e) {
      console.log(e.message)
   }
}

const saveNewUser = async (newUser: IUser[]): Promise<void> => {
   try {
      await fs.writeFile(filePath , JSON.stringify(newUser));
   } catch (e) {
      console.log(e.message)
   }      
}

   export    {
      getUsers,
      saveNewUser,
   }