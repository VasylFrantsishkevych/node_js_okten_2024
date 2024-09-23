import { Schema, model } from "mongoose";
import { User } from "./user.models";
import { IToken } from "../interfaces/token.interface";

const tokenSchema = new Schema({
   accessToken: {type: String, required: true},
   refreshToken: {type: String, required: true},

   _userId: {type: Schema.Types.ObjectId, required: true, ref: User}
},
   {
      timestamp: true,
      versionKey: false,
   }
);

export const Token = model<IToken>("tokens", tokenSchema);