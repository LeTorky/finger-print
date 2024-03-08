import { ISessionManagementSymbol } from "../presentation/services/session-management/session-management-interface";
import { IUserUseCasesSymbol } from "../application/use-cases/user-use-cases/user-use-cases-interface";
import { Module } from "@nestjs/common";
import { TokenController } from "../presentation/controllers/token/token-controller";
import { ITokenManagementSymbol } from "../presentation/services/token-management/token-management-interface";
import TokenManagement from "../presentation/services/token-management/token-management";
import { IOAuthClientSymbol } from "../application/services/sso-client/oauth-client-interface";
import MSEntraClient from "../application/services/sso-client/ms-entra-client";
import { IUserRepositorySymbol } from "../infrastructure/data-access/user-repository/user-repository-interface";
import UserUseCases from "../application/use-cases/user-use-cases/user-use-cases";
import UserRepository from "../infrastructure/data-access/user-repository/user-repository";
import SessionManagement from "../presentation/services/session-management/session-management";

@Module({
  imports: [],
  controllers: [TokenController],
  providers: [
    {
      provide: ITokenManagementSymbol,
      useClass: TokenManagement,
    },
    {
      provide: IOAuthClientSymbol,
      useClass: MSEntraClient,
    },
    {
      provide: IUserUseCasesSymbol,
      useClass: UserUseCases,
    },
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
    {
      provide: ITokenManagementSymbol,
      useClass: TokenManagement,
    },
    {
      provide: ISessionManagementSymbol,
      useClass: SessionManagement,
    },
  ],
})
export class ProdModule {}
