import INamespace from "./namespace-interface";
import IPermissions from "./permissions-interface";

export default interface INamespacePermission {
  namespace: INamespace;
  permissionList: IPermissions;
}
