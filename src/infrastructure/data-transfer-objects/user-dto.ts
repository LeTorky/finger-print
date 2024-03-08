import mongoose from "mongoose";
import NamespacePermissionDTO from "./namespace-permission-dto";
import { UUID } from "crypto";
import ContactInfoDTO from "./contact-info-dto";

export default interface UserDTO extends mongoose.Document {
  id: UUID;
  contactInfo: ContactInfoDTO;
  ssoId: string;
  namespacePermissions: NamespacePermissionDTO[];
}
