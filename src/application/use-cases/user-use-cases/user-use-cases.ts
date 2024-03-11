import User from "src/domain/aggregates/user";
import IUserUseCases from "./user-use-cases-interface";
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

@Injectable()
export default class UserUseCases implements IUserUseCases {
  private userRepository: IUserRepository;
  private userPolicies: IUserPolicies;
  private userEventBus: IUserEventBus;

  constructor(
    @Inject(IUserRepositorySymbol) userRepository: IUserRepository,
    @Inject(IUserPoliciesSymbol) userPolicies: IUserPolicies,
    @Inject(IUserEventBusSymbol) userEventBus: IUserEventBus
  ) {
    this.userRepository = userRepository;
    this.userPolicies = userPolicies;
    this.userEventBus = userEventBus;
  }

  private turnDTOToAggregate(userDTO: UserDTO): {
    contactInfo: ContactInfo;
    namespacePermissions: NamespacePermissions[];
  } {
    const contactInfoReceived = userDTO.contactInfo;
    const addressReceived = contactInfoReceived?.address;
    const receivedNamespacePermissions = userDTO.namespacePermissions;

    const newAddress = new Address(
      addressReceived?.country,
      addressReceived?.city,
      addressReceived?.address
    );
    const newContactInfo = new ContactInfo(
      contactInfoReceived?.firstName,
      contactInfoReceived?.lastName,
      contactInfoReceived?.email,
      newAddress
    );
    const newNamespacePermissions = receivedNamespacePermissions.map(
      (namespacePermission) => {
        const namespace = new Namespace(namespacePermission.namespace.name);
        const permissions = new Permissions(
          namespacePermission.permissionList.permissionList
        );
        const namespacePermissions = new NamespacePermissions(
          namespace,
          permissions
        );
        return namespacePermissions;
      }
    );
    return {
      contactInfo: newContactInfo,
      namespacePermissions: newNamespacePermissions,
    };
  }

  async getUserBySsoID(
    callerSsoID: string,
    userSsoIdToFetch: string
  ): Promise<UserDTO> {
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);
    if (
      callerSsoID != userSsoIdToFetch &&
      !this.userPolicies.canViewUser(callingUser)
    )
      throw Error("to do");
    const user = await this.userRepository.getUserBySsoId(userSsoIdToFetch);
    return user.getRepresentation() as UserDTO;
  }

  async createNewUser(
    userToCreate: UserDTO,
    callerSsoID: string
  ): Promise<UserDTO> {
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);

    const ssoId = userToCreate.ssoId;
    const { contactInfo, namespacePermissions } =
      this.turnDTOToAggregate(userToCreate);

    const newUser = callingUser.createNewUser(
      ssoId,
      contactInfo,
      namespacePermissions,
      this.userPolicies
    );

    const createdUser = await this.userRepository.createUser(newUser);
    return createdUser.getRepresentation() as UserDTO;
  }

  async editUser(userToEdit: UserDTO, callerSsoID: string): Promise<UserDTO> {
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);

    const id = userToEdit.id;
    const ssoId = userToEdit.ssoId;
    const { contactInfo, namespacePermissions } =
      this.turnDTOToAggregate(userToEdit);

    const userEvent: IUserEvent = new UserEvent(
      contactInfo,
      namespacePermissions,
      id,
      ssoId
    );

    const oldUser = await this.userRepository.getUserById(id);
    oldUser.subscribeToEventBus(this.userEventBus);

    callingUser.publishUserChanges(
      this.userPolicies,
      userEvent,
      this.userEventBus
    );

    const edittedUser = await this.userRepository.saveUser(oldUser);
    return edittedUser.getRepresentation() as UserDTO;
  }

  async deleteUser(id: UUID, callerSsoID: string): Promise<boolean> {
    const callingUser = await this.userRepository.getUserBySsoId(callerSsoID);
    if (!this.userPolicies.canDeleteUser(callingUser)) throw Error("to do");
    const output = await this.userRepository.deleteUser(id);
    return output;
  }
}
