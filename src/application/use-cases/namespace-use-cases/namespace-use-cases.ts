import INamespaceUseCases from "./namespace-use-cases-interface";
import IUserRepository, {
  IUserRepositorySymbol,
} from "src/infrastructure/data-access/user-repository/user-repository-interface";
import { Inject, Injectable } from "@nestjs/common";
import IUserPolicies, {
  IUserPoliciesSymbol,
} from "src/domain/policies/user-policies/user-policies-interface";

import { UUID } from "crypto";
import NamespaceDTO from "src/infrastructure/data-transfer-objects/namespace-dto";
import INamespaceRepository, {
  INamespaceRepositorySymbol,
} from "src/infrastructure/data-access/namespace-repository/namespace-repository-interface";
import NoPermission from "src/domain/common/domain-common-exceptions";
import ApplicationException from "src/application/exceptions/application-exceptions";

@Injectable()
export default class NamespaceUseCases implements INamespaceUseCases {
  private namespaceRepository: INamespaceRepository<string>;
  private userRepository: IUserRepository<UUID>;
  private userPolicies: IUserPolicies;

  constructor(
    @Inject(INamespaceRepositorySymbol)
    namespaceRepository: INamespaceRepository<UUID>,
    @Inject(IUserRepositorySymbol) userRepository: IUserRepository<UUID>,
    @Inject(IUserPoliciesSymbol) userPolicies: IUserPolicies
  ) {
    this.namespaceRepository = namespaceRepository;
    this.userRepository = userRepository;
    this.userPolicies = userPolicies;
  }

  async getNamespaceByName(
    callerSsoID: string,
    name: string
  ): Promise<NamespaceDTO> {
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);
    if (!this.userPolicies.canViewNameSpace(callingUser))
      throw new NoPermission("Not enough permissions to view name spaces.");
    const namespace = await this.namespaceRepository.getNamespaceById(name);
    if (!namespace) throw new ApplicationException("Namespace does not exist.");
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
    namespaceName: string,
    namespace: NamespaceDTO
  ): Promise<NamespaceDTO> {
    if (!(await this.namespaceRepository.getNamespaceById(namespaceName)))
      throw new ApplicationException("Namespace does not exist.");
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);
    const newNamespace = callingUser.updateNamespace(
      namespace.name,
      this.userPolicies
    );
    const savedNamespace = await this.namespaceRepository.changeNamespaceId(
      namespaceName,
      newNamespace
    );
    return savedNamespace.getRepresentation();
  }

  async deleteNamespace(callerSsoID: string, name: string): Promise<boolean> {
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);
    if (!this.userPolicies.canDeleteNameSpace(callingUser))
      throw new NoPermission("Not enough permissions to delete name space.");
    const deleted = await this.namespaceRepository.deleteNamespace(name);
    if (!deleted) throw new ApplicationException("Namespace does not exist.");
    return true;
  }
}
