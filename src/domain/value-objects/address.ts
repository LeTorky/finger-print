import ValueObject from '../common/value-object';

export default class Address extends ValueObject{
  private country: string;
  private city: string;
  private address: string;

  constructor(country: string, city: string, address: string) {
    super();
    this.country = country;
    this.city = city;
    this.address = address;
  }

  getCountry(): string{
    return this.country;
  }

  getCity(): string{
    return this.city;
  }

  getAddress(): string{
    return this.address;
  }

  changeCountry(country: string): Address{
    return new Address(country, this.city, this.address);
  }

  changeCity(city: string): Address{
    return new Address(this.country, city, this.address);
  }

  changeAddress(address: string): Address{
    return new Address(this.country, this.city, address);
  }

}
