import { Request } from "express";

export default interface ISessionManagement {
  getSession(req: Request): any;
  createSession(customToken: string, content: any): any;
  deleteSession(req: Request): void;
}

export const ISessionManagementSymbol = Symbol("ISessionManagementSymbol");
