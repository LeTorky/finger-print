import ValueObject from "../common/value-object";
import Address from "./address";

export default class ContactInfo extends ValueObject {
  private firstName: string;
  private lastName: string;
  private email: string;
  private address: Address;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    address: Address
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  changeFirstName(firstName: string): ContactInfo {
    return new ContactInfo(firstName, this.lastName, this.email, this.address);
  }

  changeLastName(lastName: string): ContactInfo {
    return new ContactInfo(this.firstName, lastName, this.email, this.address);
  }

  changeEmail(email: string): ContactInfo {
    return new ContactInfo(this.firstName, this.lastName, email, this.address);
  }

  changeAddress(address: Address): ContactInfo {
    return new ContactInfo(this.firstName, this.lastName, this.email, address);
  }

  getAddress(): Address {
    return this.address;
  }

  static copyContactInfo(contactInfo: ContactInfo): ContactInfo {
    return new ContactInfo(
      contactInfo.getFirstName(),
      contactInfo.getLastName(),
      contactInfo.getEmail(),
      contactInfo.getAddress()
    );
  }
}
