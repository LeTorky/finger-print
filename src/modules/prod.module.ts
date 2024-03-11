import { ISessionManagementSymbol } from "../presentation/services/session-management/session-management-interface";
import { IUserUseCasesSymbol } from "../application/use-cases/user-use-cases/user-use-cases-interface";
import { MiddlewareConsumer, Module } from "@nestjs/common";
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
import { ResourceUseCORS } from "src/presentation/middlewares/cors/resource-use-cors";
import { INamespaceRepositorySymbol } from "src/infrastructure/data-access/namespace-repository/namespace-repository-interface";
import { NamespaceRepository } from "src/infrastructure/data-access/namespace-repository/namespace-repository";
import { INamespaceUseCasesSymbol } from "src/application/use-cases/namespace-use-cases/namespace-use-cases-interface";
import NamespaceUseCases from "src/application/use-cases/namespace-use-cases/namespace-use-cases";
import NamespaceController from "src/presentation/controllers/namespace/namespace-controller";
import { APP_FILTER } from "@nestjs/core";
import ExceptionHandler from "src/presentation/middlewares/exception-handler/exception-handler";

@Module({
  imports: [],
  controllers: [TokenController, UserController, NamespaceController],
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
    {
      provide: INamespaceRepositorySymbol,
      useClass: NamespaceRepository,
    },
    {
      provide: INamespaceUseCasesSymbol,
      useClass: NamespaceUseCases,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export class ProdModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResourceUseCORS).forRoutes("*");
  }
}
