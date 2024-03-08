import { UUID, randomUUID } from "crypto";
import Aggregate from "../common/aggregate";
import ContactInfo from "../value-objects/contact-info";
import NamespacePermissions from "../value-objects/namespace-permissions";

export default class User extends Aggregate<UUID> {
  private contactInfo: ContactInfo;
  private namespacePermissions: NamespacePermissions[];
  private ssoId: string;

  constructor(
    id: UUID,
    ssoId: string,
    contactInfo: ContactInfo,
    namespacePermissions: NamespacePermissions[]
  ) {
    super(id);
    this.ssoId = ssoId;
    this.contactInfo = contactInfo;
    this.namespacePermissions = [...namespacePermissions];
  }

  static createNewUser(
    ssoId: string,
    contactInfo: ContactInfo,
    namespacePermissions: NamespacePermissions[]
  ): User {
    return new User(randomUUID(), ssoId, contactInfo, namespacePermissions);
  }

  getNamespacePermissionsList(): any[] {
    return this.namespacePermissions;
  }

  getContactInfo(): ContactInfo {
    return this.contactInfo;
  }

  updateContactInfo(contactInfo: ContactInfo) {
    this.contactInfo = contactInfo;
  }

  updateNamespacePermissionsList(namespacePermissions: NamespacePermissions[]) {
    this.namespacePermissions = namespacePermissions;
  }

  getSsoId(): string {
    return this.ssoId;
  }

  getRepresentation(): any {
    return {
      id: this.getId(),
      ssoId: this.getSsoId(),
      contactInfo: {
        firstName: this.contactInfo.getFirstName(),
        lastName: this.contactInfo.getLastName(),
        email: this.contactInfo.getEmail(),
        address: {
          country: this.contactInfo.address.getCountry(),
          city: this.contactInfo.address.getCity(),
          address: this.contactInfo.address.getAddress(),
        },
      },
      namespacePermissions: this.getNamespacePermissionsList().map(
        (namespacePermission) => {
          return {
            namespace: {
              name: namespacePermission.getNamespaceName(),
            },
            permissionList: {
              permissionList:
                namespacePermission.permissionList.getPermissions(),
            },
          };
        }
      ),
    };
  }
}
