import { UUID, randomUUID } from "crypto";
import Aggregate from "../common/aggregate";
import ContactInfo from "../value-objects/contact-info";
import NamespacePermissions from "../value-objects/namespace-permissions";

export default class User extends Aggregate<UUID>{

  private contactInfo: ContactInfo;
  private namespacePermissions: NamespacePermissions[];
  private ssoId: string;

  constructor(
    id: UUID,
    ssoId: string,
    contactInfo: ContactInfo,
    namespacePermissions: NamespacePermissions[],
  ){
    super(id);
    this.ssoId = ssoId;
    this.contactInfo = contactInfo;
    this.namespacePermissions = [...namespacePermissions];
  }

  static createNewUser(
    ssoId: string,
    contactInfo: ContactInfo,
    namespacePermissions: NamespacePermissions[],
  ): User {
    return new User(randomUUID(), ssoId, contactInfo, namespacePermissions);
  }

  getNamespacePermissionsList(): any[]{
    return this.namespacePermissions.map((namespacePermission) => {
      return {
        namespace: {
          name: namespacePermission.getNamespaceName(),
        },
        permissionList: {
          permissionList: namespacePermission.permissionList.getPermissions(),
        }
      };
    })
  }

  getContactInfo(): ContactInfo{
    return this.contactInfo;
  }

  updateContactInfo(contactInfo: ContactInfo){
    this.contactInfo = contactInfo;
  }

  updateNamespacePermissionsList(namespacePermissions: NamespacePermissions[]){
    this.namespacePermissions = namespacePermissions;
  }

  getSsoId(): string{
    return this.ssoId;
  }
}
