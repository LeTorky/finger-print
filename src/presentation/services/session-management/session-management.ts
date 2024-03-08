import { Injectable } from "@nestjs/common";
import ISessionManagement from "./session-management-interface";
import { Request } from "express";

@Injectable()
export default class SessionManagement implements ISessionManagement {
  private sessionObject: any;
  constructor() {
    this.sessionObject = {};
  }
  private extractToken(req: Request): string {
    const tokenHeader = req.headers["Authorization"] as string;
    return tokenHeader.split("AccessToken")[0];
  }
  getSession(req: Request): any {
    const token = this.extractToken(req);
    return this.sessionObject[token];
  }
  createSession(customToken: string, content: any): any {
    this.sessionObject[customToken] = content;
  }
}
