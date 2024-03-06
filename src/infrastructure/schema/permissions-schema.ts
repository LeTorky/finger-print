import { Schema } from "mongoose";
import IPermissions from 'src/domain/interfaces/permissions-interface';

const permissionsSchema = new Schema<IPermissions>({
  permissionList: { type: [String], default: [] },
});

export { permissionsSchema };
