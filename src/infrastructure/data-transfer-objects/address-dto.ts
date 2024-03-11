import { IsString } from "class-validator";

export default class AddressDTO {
  @IsString()
  country: string;
  @IsString()
  city: string;
  @IsString()
  address: string;
}
