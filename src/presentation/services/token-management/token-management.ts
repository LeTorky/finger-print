import ITokenManagement from "./token-management-interface";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { Injectable } from "@nestjs/common";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

@Injectable()
export default class TokenManagement implements ITokenManagement {
  IssueToken(
    content: any,
    tokenExpirationTime: number,
    refreshTokenExpirationTime: number | null = null
  ): { token: string; refreshToken: string } {
    let refreshToken = null;
    content["exp"] = Math.floor(Date.now() / 1000) + tokenExpirationTime;
    const token = jwt.sign(content, privateKey, { algorithm: "RS256" });
    const refreshTokenTTL =
      Math.floor(Date.now() / 1000) + refreshTokenExpirationTime;
    if (refreshTokenExpirationTime)
      refreshToken = jwt.sign({ exp: refreshTokenTTL }, privateKey, {
        algorithm: "RS256",
      });
    return { token, refreshToken };
  }

  DecodeToken(token: string): any {
    return jwt.decode(token, publicKey, { algorithm: "RS256" });
  }
}
