import axios from "axios";
import IOAuthClient from "./oauth-client-interface";
import { stringify } from "querystring";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { Injectable } from "@nestjs/common";

dotenv.config();

@Injectable()
export default class MSEntraClient implements IOAuthClient {
  async getAccessToken(options: {}): Promise<string> {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const data = stringify({
      client_id: process.env.MS_ENTRA_CLIENT_ID,
      client_secret: process.env.MS_ENTRA_CLIENT_SECRET,
      grant_type: "authorization_code",
      scope: "openid",
      ...options,
    });

    const response = await axios.post(
      `${process.env.MS_ENTRA_DOMAIN}common/oauth2/v2.0/token`,
      data,
      {
        headers,
      }
    );
    const token = response.data;
    return token;
  }

  decodeAccessToken(token: string): any {
    //TODO: Add private certificate in MS Entra and a public certificate here.
    return jwt.decode(token);
  }
}
