import { Injectable } from "@nestjs/common";
import ISessionManagement from "./session-management-interface";
import { Request } from "express";

@Injectable()
export default class SessionManagement implements ISessionManagement {
  private sessionLookup: any;
  constructor() {
    this.sessionLookup = {};
  }

  private extractToken(req: Request): string {
    const tokenHeader = req.headers["authorization"] as string;
    return tokenHeader.split("AccessToken ")[1];
  }

  getSession(req: Request): any {
    const token = this.extractToken(req);
    return this.sessionLookup[token];
  }

  createSession(customToken: string, content: any): any {
    this.sessionLookup[customToken] = content;
  }

  deleteSession(req: Request): void {
    const customToken = this.extractToken(req);
    if (!this.sessionLookup[customToken]) throw Error("to do");
    delete this.sessionLookup[customToken];
  }
}
