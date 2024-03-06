import Namespace from 'src/domain/entities/namespace';
import Permissions from "./permissions";
import ValueObject from "../common/value-object";

export default class NamespacePermissions extends ValueObject{
  private namespace: Namespace;
  permissionList: Permissions;

  constructor(namespace: Namespace, permissionList: Permissions) {
    super();
    this.namespace = namespace;
    this.permissionList = Permissions.copyPermissions(permissionList);
  }

  addPermissions(newPermissions: string[]): NamespacePermissions {
    const newPermissionList =
      this.permissionList.addPermissions(newPermissions);
    return new NamespacePermissions(this.namespace, newPermissionList);
  }

  removePermissions(permissionsToRemove: string[]): NamespacePermissions {
    const newPermissionList =
      this.permissionList.removePermissions(permissionsToRemove);
    return new NamespacePermissions(this.namespace, newPermissionList);
  }

  getNamespaceName(): string{
    return this.namespace.getName();
  }

  changeNamespace(namespace: Namespace): NamespacePermissions{
    return new NamespacePermissions(namespace, this.permissionList);
  }
}
