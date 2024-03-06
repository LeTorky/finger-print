import mongoose from "mongoose";
import IContactInfo from "./contact-info-interface";
import INamespacePermission from "./namespace-permission-interface";
import { UUID } from "crypto";

export default interface IUser extends mongoose.Document{
  id: UUID;
  contactInfo: IContactInfo;
  ssoId: string;
  namespacePermissions: INamespacePermission[];
}
