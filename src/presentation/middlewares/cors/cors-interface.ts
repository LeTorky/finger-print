import { Request } from "express";

export default interface ICORS {
  checkRequest(req: Request): void;
}
