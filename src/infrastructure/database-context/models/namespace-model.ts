import mongoose from "mongoose";
import INamespace from "src/domain/interfaces/namespace-interface";
import { namespaceSchema, namespaceTable } from "../schema/namespace-schema";

const namespaceModel = mongoose.model<INamespace>(
  namespaceTable,
  namespaceSchema
);

export default namespaceModel;
