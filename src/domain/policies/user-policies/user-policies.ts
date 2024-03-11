import User from "src/domain/aggregates/user";
import IUserPolicies from "./user-policies-interface";
import { FINGER_PRINT_NAMESPACE } from "src/domain/enums/namespace-enums/namespace-enums";
import {
  canDeleteUser,
  canEditUser,
  canReadUser,
  canWriteUser,
} from "src/domain/enums/permissions-enums/user-permissions-enums";
import {
  canEditNameSpace,
  canWriteNameSpace,
} from "src/domain/enums/permissions-enums/name-space-permissions-enums";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class UserPolicies implements IUserPolicies {
  canCreateNewUser(user: User): boolean {
    return user
      .getNamespacePermissionsList()
      .reduce(
        (final, current) =>
          current.getNamespaceName() == FINGER_PRINT_NAMESPACE &&
          current.permissionList.getPermissions().includes(canWriteUser)
            ? true
            : final,
        false
      );
  }

  canEditUser(user: User): boolean {
    return user
      .getNamespacePermissionsList()
      .reduce(
        (final, current) =>
          current.getNamespaceName() == FINGER_PRINT_NAMESPACE &&
          current.permissionList.getPermissions().includes(canEditUser)
            ? true
            : final,
        false
      );
  }

  canViewUser(user: User): boolean {
    return user
      .getNamespacePermissionsList()
      .reduce(
        (final, current) =>
          current.getNamespaceName() == FINGER_PRINT_NAMESPACE &&
          current.permissionList.getPermissions().includes(canReadUser)
            ? true
            : final,
        false
      );
  }

  canCreateNameSpace(user: User): boolean {
    return user
      .getNamespacePermissionsList()
      .reduce(
        (final, current) =>
          current.getNamespaceName() == FINGER_PRINT_NAMESPACE &&
          current.permissionList.getPermissions().includes(canWriteNameSpace)
            ? true
            : final,
        false
      );
  }

  canEditNameSpace(user: User): boolean {
    return user
      .getNamespacePermissionsList()
      .reduce(
        (final, current) =>
          current.getNamespaceName() == FINGER_PRINT_NAMESPACE &&
          current.permissionList.getPermissions().includes(canEditNameSpace)
            ? true
            : final,
        false
      );
  }

  canDeleteUser(user: User): boolean {
    return user
      .getNamespacePermissionsList()
      .reduce(
        (final, current) =>
          current.getNamespaceName() == FINGER_PRINT_NAMESPACE &&
          current.permissionList.getPermissions().includes(canDeleteUser)
            ? true
            : final,
        false
      );
  }
}
