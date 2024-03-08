import { Schema } from "mongoose";
import IContactInfo from "src/domain/interfaces/contact-info-interface";
import { addressSchema } from "./address-schema";

const contactInfoSchema = new Schema<IContactInfo>(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    address: addressSchema,
  },
  { _id: false }
);

export { contactInfoSchema };
