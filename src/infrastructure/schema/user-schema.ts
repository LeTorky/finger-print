import { UUID } from 'crypto';
import { Schema } from "mongoose";
import IUser from "src/domain/interfaces/user-interface";
import { namespacePermissionsSchema } from "./namespace-permissions-schema";
import { contactInfoSchema } from "./contact-info-schema";

const userTable = 'User'

const userSchema = new Schema<IUser>({
  namespacePermissions: [namespacePermissionsSchema],
  ssoId: { type: String, unique: true, index: true },
  contactInfo: contactInfoSchema,
  _id: String
});

userSchema
  .virtual('id')
  .get(function () {
    return this._id;
  })
  .set(function (id) {
    this._id = id;
  });

export { userSchema, userTable };
