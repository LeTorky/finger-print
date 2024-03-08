import mongoose from "mongoose";
import { userSchema, userTable } from "../schema/user-schema";
import IUser from "src/domain/interfaces/user-interface";

const userModel = mongoose.model<IUser>(userTable, userSchema);

export default userModel;
