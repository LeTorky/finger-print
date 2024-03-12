import { Inject, Injectable } from "@nestjs/common";
import ISessionManagement from "./session-management-interface";
import { Request } from "express";
import SessionException from "../exceptions/session-exceptions";
import ITokenManagement, {
  ITokenManagementSymbol,
} from "../token-management/token-management-interface";

@Injectable()
export default class SessionManagement implements ISessionManagement {
  private sessionLookup: any;
  private refreshLookup: any;
  private tokenManagement: ITokenManagement;
  constructor(
    @Inject(ITokenManagementSymbol) tokenManagement: ITokenManagement
  ) {
    this.tokenManagement = tokenManagement;
    this.sessionLookup = {};
    this.refreshLookup = {};
  }

  private extractToken(req: Request, header: string): string {
    try {
      const tokenHeader = req.headers[header] as string;
      return tokenHeader.split("AccessToken ")[1];
    } catch {
      throw new SessionException("No or invalid AccessToken.");
    }
  }

  private runInvalidateTokenTask(
    lookUp: any,
    customToken: string,
    TTL: number
  ) {
    setTimeout(() => {
      if (lookUp[customToken]) delete lookUp[customToken];
    }, TTL);
  }

  getSession(req: Request): any {
    const token = this.extractToken(req, "authorization");
    const session = this.sessionLookup[token];
    if (!session) throw new SessionException("Expired AccessToken.");
    return this.sessionLookup[token];
  }

  createSession(
    customToken: string,
    content: any,
    tokenTTL: number,
    refreshToken: string | null = null,
    refreshTokenTTL: number | null = null
  ): void {
    this.sessionLookup[customToken] = content;
    this.runInvalidateTokenTask(this.sessionLookup, customToken, tokenTTL);
    if (refreshToken && refreshTokenTTL) {
      this.refreshLookup[refreshToken] = { customToken, content };
      this.runInvalidateTokenTask(
        this.refreshLookup,
        refreshToken,
        refreshTokenTTL
      );
    }
  }

  deleteSession(req: Request): void {
    const customToken = this.extractToken(req, "authorization");
    if (!this.sessionLookup[customToken])
      throw new SessionException("Already Logged out.");
    delete this.sessionLookup[customToken];
  }

  refreshSession(req: Request, tokenTTL: number): string {
    const refreshToken = this.extractToken(req, "refresh-token");
    const { customToken, content } = this.refreshLookup[refreshToken] || {};
    if (!customToken) throw new SessionException("Refresh token expired.");
    if (customToken in this.sessionLookup)
      delete this.sessionLookup[customToken];
    const { token } = this.tokenManagement.IssueToken(content, tokenTTL, null);
    this.createSession(token, content, tokenTTL);
    return token;
  }
}
