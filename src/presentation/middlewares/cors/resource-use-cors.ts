import { NextFunction, Request, Response } from "express";
import ICORS from "./cors-interface";
import * as dotenv from "dotenv";
import { Req, Res, Next } from "@nestjs/common";
import { NestMiddleware } from "@nestjs/common";

dotenv.config();
const ALLOWED_ORIGINS: string[] = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .filter(Boolean);

export class ResourceUseCORS implements ICORS, NestMiddleware {
  checkRequest(req: Request): void {
    const origin = req.headers["origin"];
    if (!ALLOWED_ORIGINS.includes(origin)) throw Error("to do");
  }

  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    this.checkRequest(req);
    next();
  }
}
