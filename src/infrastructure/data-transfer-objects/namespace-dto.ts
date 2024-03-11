import { IsNotEmpty, IsString } from "class-validator";

export default class NamespaceDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
