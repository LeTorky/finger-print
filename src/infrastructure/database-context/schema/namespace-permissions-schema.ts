import { Schema } from "mongoose";
import { permissionsSchema } from "./permissions-schema";
import INamespacePermission from "src/domain/interfaces/namespace-permission-interface";
import { namespaceTable } from "./namespace-schema";

const namespacePermissionsSchema = new Schema<INamespacePermission>(
  {
    namespace: {
      type: String,
      ref: namespaceTable,
    },
    permissionList: permissionsSchema,
  },
  { _id: false }
);

export { namespacePermissionsSchema };
