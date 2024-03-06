import { Schema } from "mongoose";
import INamespace from "src/domain/interfaces/namespace-interface";

const namespaceTable = 'Namespace';
const namespaceSchema = new Schema<INamespace>({ _id: String });

namespaceSchema.index({ name: 1 }, { unique: true });

namespaceSchema
  .virtual('name')
  .get(function () {
    return this._id;
  })
  .set(function (name) {
    this._id = name;
  });

export { namespaceTable, namespaceSchema };
