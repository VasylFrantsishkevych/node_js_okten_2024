import { Schema, model } from "mongoose";
import { User } from "./user.models";
import { IOldPassword } from "../interfaces/old-password.interface";

const oldPasswordSchema = new Schema({
   password: {type: String, required: true, select: false},

   _userId: {type: Schema.Types.ObjectId, required: true, ref: User}
},
   {
      timestamps: true,
      versionKey: false,
   }
);

export const OldPassword = model<IOldPassword>("old-passwords", oldPasswordSchema);