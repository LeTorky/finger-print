import mongoose from "mongoose";

export default interface INamespace extends mongoose.Document{
  name: string;
}
