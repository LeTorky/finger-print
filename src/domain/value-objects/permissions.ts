import ValueObject from '../common/value-object';

export default class Permissions extends ValueObject{
  private permissionList: string[] = [];
  private permissionSetLookUp: Set<string> = new Set<string>();
  constructor(permissionList: string[]){
    super();
    permissionList.forEach((permission) => {
      if (!(permission in this.permissionSetLookUp)) {
        this.permissionSetLookUp.add(permission);
        this.permissionList.push(permission);
      }
    })
  }

  getPermissions(): string[]{
    return [...this.permissionList];
  }

  addPermissions(newPermissions: string[]): Permissions{
    const allPermissions = [...this.permissionList];
    newPermissions.forEach((permission) =>
      !this.permissionSetLookUp.has(permission)
        ? allPermissions.push(permission)
        : null
    );
    return new Permissions(allPermissions);
  }

  removePermissions(permissionsToRemove: string[]): Permissions{
    const removeLookUp = new Set(permissionsToRemove);
    const newPermissions = this.permissionList.filter(
      (permission) => !removeLookUp.has(permission)
    );
    return new Permissions(newPermissions);
  }

  static copyPermissions(permissions: Permissions): Permissions{
    return new Permissions(permissions.getPermissions());
  }
}
