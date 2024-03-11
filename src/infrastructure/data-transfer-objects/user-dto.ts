import NamespacePermissionDTO from "./namespace-permission-dto";
import { UUID } from "crypto";
import ContactInfoDTO from "./contact-info-dto";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export default class UserDTO {
  id: UUID;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactInfoDTO)
  contactInfo: ContactInfoDTO;
  @IsNotEmpty()
  @IsString()
  ssoId: string;
  @IsNotEmpty()
  @ValidateNested()
  @IsArray()
  @Type(() => NamespacePermissionDTO)
  namespacePermissions: NamespacePermissionDTO[];
}
