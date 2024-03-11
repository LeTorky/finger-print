import { IsArray, IsNotEmpty, IsString } from "class-validator";

export default class PermissionsDTO {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  permissionList: string[];
}
