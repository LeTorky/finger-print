import { Request } from "express";

export default interface ISessionManagement {
  getSession(req: Request): any;
  createSession(
    customToken: string,
    content: any,
    tokenTTL: number,
    refreshToken: string | null,
    refreshTokenTTL: number | null
  ): void;
  deleteSession(req: Request): void;
  refreshSession(req: Request, tokenTTL: number): string;
}

export const ISessionManagementSymbol = Symbol("ISessionManagementSymbol");
