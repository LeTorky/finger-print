import { Body, Controller, Inject, Post, Req, Res } from "@nestjs/common";
import IUserUseCases, {
  IUserUseCasesSymbol,
} from "src/application/use-cases/user-use-cases/user-use-cases-interface";
import TokenManagementInterface, {
  ITokenManagementSymbol,
} from "../services/token-management/token-management-interface";
import OAuthClientInterface, {
  IOAuthClientSymbol,
} from "src/application/services/sso-client/oauth-client-interface";
import { Response } from "express";

@Controller()
export class UserController {
  private userUseCases: IUserUseCases;
  private oAuthClient: OAuthClientInterface;
  private tokenManager: TokenManagementInterface;

  constructor(
    @Inject(IOAuthClientSymbol) oAuthClient: OAuthClientInterface,
    @Inject(ITokenManagementSymbol) tokenManager: TokenManagementInterface,
    @Inject(IUserUseCasesSymbol) userUseCases: IUserUseCases
  ) {
    this.oAuthClient = oAuthClient;
    this.tokenManager = tokenManager;
    this.userUseCases = userUseCases;
  }

  @Post()
  async getCustomToken(
    @Body("code") code: string,
    @Res() res: Response,
    @Req() req: Request
  ): Promise<Response> {
    const origin = req.headers["origin"];
    const oAuthResponse = await this.oAuthClient.getAccessToken({
      code,
      redirect_uri: origin,
    });
    const accessToken = oAuthResponse["access_token"];
    const payLoad = this.oAuthClient.decodeAccessToken(accessToken);
    const ssoId = payLoad["sub"];
    const user = await this.userUseCases.getUserBySsoID(ssoId);
    const userRepresentation = user.getRepresentation();
    delete userRepresentation.id;
    const customToken = this.tokenManager.IssueToken(userRepresentation, 87300);
    return res
      .setHeader("Authorization", `AccessToken ${customToken}`)
      .status(200)
      .send("OK");
  }
}
