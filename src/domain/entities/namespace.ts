import { Types } from "mongoose";
import Entity from "../common/entity";

type ObjectId = Types.ObjectId;

export default class Namespace extends Entity<ObjectId>{
  private name: string;
  constructor(id: ObjectId, name: string) {
    super(id);
    this.name = name;
  }
  getName(): string{
    return this.name;
  }
};
