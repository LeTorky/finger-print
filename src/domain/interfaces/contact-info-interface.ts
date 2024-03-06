import IAddress from "./address-interface";

export default interface IContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: IAddress;
}
