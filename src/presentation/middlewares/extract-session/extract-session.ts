import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import ISessionManagement, {
  ISessionManagementSymbol,
} from "../../services/session-management/session-management-interface";

@Injectable()
export class ExtractSessionMiddleware implements NestMiddleware {
  private sessionManagement: ISessionManagement;
  constructor(
    @Inject(ISessionManagementSymbol) sessionManagement: ISessionManagement
  ) {
    this.sessionManagement = sessionManagement;
  }
  use(req: Request, res: Response, next: NextFunction) {
    this.sessionManagement.getSession(req);
    next();
  }
}
