import { Schema } from "mongoose";
import IAddress from "src/domain/interfaces/address-interface";

const addressSchema = new Schema<IAddress>(
  {
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  { _id: false }
);

export { addressSchema };
