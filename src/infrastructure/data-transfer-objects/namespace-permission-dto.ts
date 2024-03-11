import { IsNotEmpty, ValidateNested } from "class-validator";
import NamespaceDTO from "./namespace-dto";
import PermissionsDTO from "./permissions-dto";
import { Type } from "class-transformer";

export default class NamespacePermissionDTO {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => NamespaceDTO)
  namespace: NamespaceDTO;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PermissionsDTO)
  permissionList: PermissionsDTO;
}
