import { Injectable } from "@nestjs/common";
import ISessionManagement from "./session-management-interface";
import { Request } from "express";
import SessionException from "../exceptions/session-exceptions";

@Injectable()
export default class SessionManagement implements ISessionManagement {
  private sessionLookup: any;
  constructor() {
    this.sessionLookup = {};
  }

  private extractToken(req: Request): string {
    try {
      const tokenHeader = req.headers["authorization"] as string;
      return tokenHeader.split("AccessToken ")[1];
    } catch {
      throw new SessionException("No or invalid AccessToken.");
    }
  }

  getSession(req: Request): any {
    const token = this.extractToken(req);
    const session = this.sessionLookup[token];
    if (!session) throw new SessionException("Expired AccessToken.");
    return this.sessionLookup[token];
  }

  createSession(customToken: string, content: any): any {
    this.sessionLookup[customToken] = content;
  }

  deleteSession(req: Request): void {
    const customToken = this.extractToken(req);
    if (!this.sessionLookup[customToken])
      throw new SessionException("Already Logged out.");
    delete this.sessionLookup[customToken];
  }
}
