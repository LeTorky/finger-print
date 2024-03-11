import ContactInfo from "src/domain/value-objects/contact-info";
import NamespacePermissions from "src/domain/value-objects/namespace-permissions";
import IUserEvent from "./user-event-interface";

export default class UserEvent implements IUserEvent {
  private contactInfo: ContactInfo;
  private namespacePermissionsList: NamespacePermissions[];
  private ssoId: string;
  private id: string;

  constructor(
    contactInfo: ContactInfo,
    namespacePermissionsList: NamespacePermissions[],
    id: string,
    ssoId: string
  ) {
    this.contactInfo = contactInfo;
    this.namespacePermissionsList = namespacePermissionsList;
    this.id = id;
    this.ssoId = ssoId;
  }

  getContactInfo(): ContactInfo {
    return this.contactInfo;
  }

  getNamespacePermissionsList(): NamespacePermissions[] {
    return this.namespacePermissionsList;
  }

  getSsoId(): string {
    return this.ssoId;
  }

  getId(): string {
    return this.id;
  }
}
