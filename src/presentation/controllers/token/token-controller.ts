import ISessionManagement, {
  ISessionManagementSymbol,
} from "../../services/session-management/session-management-interface";
import { Body, Controller, Inject, Post, Req, Res } from "@nestjs/common";
import IUserUseCases, {
  IUserUseCasesSymbol,
} from "src/application/use-cases/user-use-cases/user-use-cases-interface";
import TokenManagementInterface, {
  ITokenManagementSymbol,
} from "../../services/token-management/token-management-interface";
import IOAuthClient, {
  IOAuthClientSymbol,
} from "src/application/services/sso-client/oauth-client-interface";
import { Response, Request } from "express";

@Controller("token")
export class TokenController {
  private userUseCases: IUserUseCases;
  private oAuthClient: IOAuthClient;
  private tokenManager: TokenManagementInterface;
  private sessionManagement: ISessionManagement;

  constructor(
    @Inject(IOAuthClientSymbol) oAuthClient: IOAuthClient,
    @Inject(ITokenManagementSymbol) tokenManager: TokenManagementInterface,
    @Inject(IUserUseCasesSymbol) userUseCases: IUserUseCases,
    @Inject(ISessionManagementSymbol) SessionManagement: ISessionManagement
  ) {
    this.oAuthClient = oAuthClient;
    this.tokenManager = tokenManager;
    this.userUseCases = userUseCases;
    this.sessionManagement = SessionManagement;
  }

  @Post("exchange")
  async getCustomToken(
    @Body("code") code: string,
    @Body("scope") scope: string[],
    @Res() res: Response,
    @Req() req: Request
  ): Promise<Response> {
    const origin = req.headers["origin"];
    const oAuthResponse = await this.oAuthClient.getAccessToken({
      code,
      scope,
      redirect_uri: origin,
    });
    const accessToken = oAuthResponse["access_token"];
    const refreshToken = oAuthResponse["refresh_token"];
    const payLoad = this.oAuthClient.decodeAccessToken(accessToken);
    const ssoId = payLoad["sub"];
    const user = await this.userUseCases.getUserBySsoID(ssoId, ssoId);
    const userId = user.id;

    // Can't provide database column in a token (Vulnerability).
    delete user.id;

    const customToken = this.tokenManager.IssueToken(user, 87300);
    this.sessionManagement.createSession(customToken, {
      ssoId: user.ssoId,
      id: userId,
      accessToken,
      refreshToken,
    });

    return res
      .setHeader("Authorization", `AccessToken ${customToken}`)
      .status(200)
      .send("OK");
  }

  @Post("logout")
  async logOut(@Req() req: Request, @Res() res: Response): Promise<Response> {
    this.sessionManagement.deleteSession(req);
    return res.status(200).send("OK");
  }
}
