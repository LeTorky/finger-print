import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import AddressDTO from "./address-dto";

export default class ContactInfoDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  address: AddressDTO;
}
