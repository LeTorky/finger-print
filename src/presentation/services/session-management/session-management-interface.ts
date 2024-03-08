import { Request } from "express";

export default interface ISessionManagement {
  getSession(req: Request): any;
  createSession(customToken: string, content: any): any;
}

export const ISessionManagementSymbol = Symbol("ISessionManagementSymbol");
