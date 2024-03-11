import User from "src/domain/aggregates/user";

export default interface IUserPolicies {
  canCreateNewUser(user: User): boolean;
  canEditUser(user: User): boolean;
  canViewUser(user: User): boolean;
  canViewNameSpace(user: User): boolean;
  canCreateNameSpace(user: User): boolean;
  canEditNameSpace(user: User): boolean;
  canDeleteNameSpace(user: User): boolean;
  canDeleteUser(user: User): boolean;
}

export const IUserPoliciesSymbol = Symbol("IUserPolicies");
