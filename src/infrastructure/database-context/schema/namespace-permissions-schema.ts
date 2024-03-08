import { Schema } from "mongoose";
import { namespaceSchema } from "./namespace-schema";
import { permissionsSchema } from "./permissions-schema";
import INamespacePermission from "src/domain/interfaces/namespace-permission-interface";

const namespacePermissionsSchema = new Schema<INamespacePermission>({
    namespace: namespaceSchema,
    permissionList: permissionsSchema,
  },
  { _id: false },
);

export { namespacePermissionsSchema };
