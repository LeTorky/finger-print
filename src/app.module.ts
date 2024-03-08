import { IUserUseCasesSymbol } from "./application/use-cases/user-use-cases/user-use-cases-interface";
import { Module } from "@nestjs/common";
import { UserController } from "./presentation/controllers/user-controllers";
import { ITokenManagementSymbol } from "./presentation/services/token-management/token-management-interface";
import TokenManagement from "./presentation/services/token-management/token-management";
import { IOAuthClientSymbol } from "./application/services/sso-client/oauth-client-interface";
import MSEntraClient from "./application/services/sso-client/ms-entra-client";
import { IUserRepositorySymbol } from "./infrastructure/data-access/user-repository/user-repository-interface";
import UserUseCases from "./application/use-cases/user-use-cases/user-use-cases";
import UserRepository from "./infrastructure/data-access/user-repository/user-repository";

@Module({
  imports: [],
  controllers: [UserController],
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
  ],
})
export class AppModule {}
