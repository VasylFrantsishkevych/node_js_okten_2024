import { RoleEnum } from "../enums/role.enum";

export interface IUser {
   _id?: string,
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

export type ISignIn = Pick<IUser, 'email' | 'password'>;

export type IResetPasswordSend = Pick<IUser, 'email'>;

export type IResetPasswordSet = Pick<IUser, 'password'> & {token: string};

export type IVerifyEmail = Pick<IUser, 'isVerified'> & {token: string};

export type IChangePassword = Pick<IUser, "password"> & { oldPassword: string };
