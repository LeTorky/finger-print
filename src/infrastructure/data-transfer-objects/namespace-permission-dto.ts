import NamespaceDTO from "./namespace-dto";
import PermissionsDTO from "./permissions-dto";

export default interface NamespacePermissionDTO {
  namespace: NamespaceDTO;
  permissionList: PermissionsDTO;
}
