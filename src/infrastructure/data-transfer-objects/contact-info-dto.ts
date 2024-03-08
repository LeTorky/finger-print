import AddressDTO from "./address-dto";

export default interface ContactInfoDTO {
  firstName: string;
  lastName: string;
  email: string;
  address: AddressDTO;
}
