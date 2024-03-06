import { Schema } from "mongoose";
import INamespace from "src/domain/interfaces/namespace-interface";

const namespaceTable = 'Namespace';
const namespaceSchema = new Schema<INamespace>({
  name: { type: String, required: true, unique: true },
});


namespaceSchema.index({ name: 1 }, { unique: true });

export { namespaceTable, namespaceSchema };
