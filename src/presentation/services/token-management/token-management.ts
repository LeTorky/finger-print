import ITokenManagement from "./token-management-interface";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { Injectable } from "@nestjs/common";

dotenv.config();

const privateKeyPath = process.env.PRIVATE_KEY_PATH;
const publicKeyPath = process.env.PUBLIC_KEY_PATH;
const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const publicKey = fs.readFileSync(publicKeyPath, "utf8");

@Injectable()
export default class TokenManagement implements ITokenManagement {
  IssueToken(content: {}, expirationTime: number): string {
    content["exp"] = Math.floor(Date.now() / 1000) + expirationTime;
    const token = jwt.sign(content, privateKey, { algorithm: "RS256" });
    return token;
  }
  DecodeToken(token: string): any {
    return jwt.decode(token, publicKey, { algorithm: "RS256" });
  }
}
