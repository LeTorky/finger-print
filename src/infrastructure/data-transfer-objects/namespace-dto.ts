import mongoose from "mongoose";

export default interface NamespaceDTO extends mongoose.Document {
  name: string;
}
