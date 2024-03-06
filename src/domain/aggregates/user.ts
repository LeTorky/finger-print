import { UUID } from "crypto";
import Aggregate from "../common/aggregate";
import ContactInfo from "../value-objects/contact-info";
import NamespacePermissions from "../entities/namespace-permissions";

export default class User extends Aggregate<UUID>{
  contactInfo: ContactInfo;
  private namespacePermissions: NamespacePermissions[];

  protected constructor(
    id: UUID,
    contactInfo: ContactInfo,
    namespacePermissions: NamespacePermissions[],
  ){
    super(id);
    this.contactInfo = contactInfo;
    this.namespacePermissions = [...namespacePermissions];
  }

  getNamespacePermissionsList(): any[]{
    return this.namespacePermissions.map((namespacePermission) => {
      return {
        namespace: namespacePermission.getNamespaceName(),
        permissionList: namespacePermission.permissionList.getPermissions()
      };
    })
  }
}
