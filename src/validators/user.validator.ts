import Joi from "joi";
import { regex } from "../constants/regex";
import { RoleEnum } from "../enums/role.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";
import { OrderEnum } from "../enums/order.enum";

export const userValidator = Joi.object({
   name: Joi.string().alphanum().min(3).max(30).trim().required(),
   email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
   password: Joi.string().regex(regex.PASSWORD).required(),
   age: Joi.number().integer().min(1).max(100).required(),
   phone: Joi.string().regex(regex.PHONE).trim(),
   role: Joi.any().valid(RoleEnum),
})

export const userUpdateValidator = Joi.object({
   name: Joi.string().alphanum().min(3).max(30).trim(),
   email: Joi.string().regex(regex.EMAIL).lowercase().trim(),
   age: Joi.number().integer().min(1).max(100),
   phone: Joi.string().regex(regex.PHONE).trim(),
})

export const signIn = Joi.object({
   email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
   password: Joi.string().regex(regex.PASSWORD).required(),
})

export const changePassword = Joi.object({
   oldPassword: Joi.string().regex(regex.PASSWORD).required(),
   password: Joi.string().regex(regex.PASSWORD).required(),
 });

 export const listQuery = Joi.object({
   limit: Joi.number().min(1).max(100).default(10),
   page: Joi.number().min(1).default(1),
   search: Joi.string().trim().lowercase(),
   order: Joi.string().valid(...Object.values(OrderEnum)),
   orderBy: Joi.string().valid(...Object.values(UserListOrderByEnum)),
 })