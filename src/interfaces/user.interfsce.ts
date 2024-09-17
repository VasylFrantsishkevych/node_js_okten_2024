import { RoleEnum } from "../enums/role.enum";

export interface IUser {
   id: string,
   name: string,
   email: string,
   password: string,
   age: number,
   phone?: string,
   role: RoleEnum,
   isVerified: boolean,
   idDeleted: boolean,
   createdAt?: Date;
   updatedAt?: Date;
}

export interface IDtoUser {
   name: string,
   email: string,
   password: string,
}