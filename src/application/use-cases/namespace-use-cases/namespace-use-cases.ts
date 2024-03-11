import User from "src/domain/aggregates/user";
import INamespaceUseCases from "./namespace-use-cases-interface";
import IUserRepository, {
  IUserRepositorySymbol,
} from "src/infrastructure/data-access/user-repository/user-repository-interface";
import { Inject, Injectable } from "@nestjs/common";
import IUser from "src/domain/interfaces/user-interface";
import IUserPolicies, {
  IUserPoliciesSymbol,
} from "src/domain/policies/user-policies/user-policies-interface";
import Address from "src/domain/value-objects/address";
import ContactInfo from "src/domain/value-objects/contact-info";
import Namespace from "src/domain/entities/namespace";
import Permissions from "src/domain/value-objects/permissions";
import NamespacePermissions from "src/domain/value-objects/namespace-permissions";
import UserDTO from "src/infrastructure/data-transfer-objects/user-dto";
import IUserEventBus, {
  IUserEventBusSymbol,
} from "src/domain/events/user/user-event-bus/user-event-bus-interface";
import IUserEvent from "src/domain/events/user/user-events/user-event-interface";
import UserEvent from "src/domain/events/user/user-events/user-update-event";
import { UUID } from "crypto";
import NamespaceDTO from "src/infrastructure/data-transfer-objects/namespace-dto";
import INamespaceRepository, {
  INamespaceRepositorySymbol,
} from "src/infrastructure/data-access/namespace-repository/namespace-repository-interface";

@Injectable()
export default class NamespaceUseCases implements INamespaceUseCases {
  private namespaceRepository: INamespaceRepository<string>;
  private userRepository: IUserRepository<UUID>;
  private userPolicies: IUserPolicies;
  private userEventBus: IUserEventBus;

  constructor(
    @Inject(INamespaceRepositorySymbol)
    namespaceRepository: INamespaceRepository<UUID>,
    @Inject(IUserRepositorySymbol) userRepository: IUserRepository<UUID>,
    @Inject(IUserPoliciesSymbol) userPolicies: IUserPolicies,
    @Inject(IUserEventBusSymbol) userEventBus: IUserEventBus
  ) {
    this.namespaceRepository = namespaceRepository;
    this.userRepository = userRepository;
    this.userPolicies = userPolicies;
    this.userEventBus = userEventBus;
  }

  private turnDTOToEntity(namespaceDTO: NamespaceDTO): Namespace {
    return new Namespace(namespaceDTO.name);
  }

  async getNamespaceByName(
    callerSsoID: string,
    name: string
  ): Promise<NamespaceDTO> {
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);
    if (!this.userPolicies.canViewNameSpace(callingUser)) throw Error("To do");
    const namespace = await this.namespaceRepository.getNamespaceById(name);
    return namespace.getRepresentation();
  }

  async createNewNamespace(
    callerSsoID: string,
    name: string
  ): Promise<NamespaceDTO> {
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);
    const newNamespace = callingUser.createNamespace(name, this.userPolicies);
    const createdNamespace =
      await this.namespaceRepository.createNamespace(newNamespace);
    return {
      name: createdNamespace.getName(),
    };
  }

  async editNamespace(
    callerSsoID: string,
    oldName: string,
    namespace: NamespaceDTO
  ): Promise<NamespaceDTO> {
    throw new Error("Method not implemented.");
  }

  async deleteNamespace(callerSsoID: string, name: string): Promise<boolean> {
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);
    if (!this.userPolicies.canDeleteNameSpace(callingUser))
      throw Error("To do");
    const deleted = await this.namespaceRepository.deleteNamespace(name);
    return deleted;
  }
}
