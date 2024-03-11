import ContactInfo from "src/domain/value-objects/contact-info";
import NamespacePermissions from "src/domain/value-objects/namespace-permissions";

export default interface IUserEvent {
  getContactInfo(): ContactInfo;
  getNamespacePermissionsList(): NamespacePermissions[];
  getSsoId(): string;
  getId(): string;
}
