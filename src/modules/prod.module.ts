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
import UserController from "src/presentation/controllers/user/user-controller";
import { IUserEventBusSymbol } from "src/domain/events/user/user-event-bus/user-event-bus-interface";
import UserEventBus from "src/domain/events/user/user-event-bus/user-event-bus";
import { IUserPoliciesSymbol } from "src/domain/policies/user-policies/user-policies-interface";
import UserPolicies from "src/domain/policies/user-policies/user-policies";

@Module({
  imports: [],
  controllers: [TokenController, UserController],
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
    {
      provide: IUserEventBusSymbol,
      useClass: UserEventBus,
    },
    {
      provide: IUserPoliciesSymbol,
      useClass: UserPolicies,
    },
  ],
})
export class ProdModule {}
