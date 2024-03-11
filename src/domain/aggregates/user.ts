import { UUID, randomUUID } from "crypto";
import Aggregate from "../common/aggregate";
import ContactInfo from "../value-objects/contact-info";
import NamespacePermissions from "../value-objects/namespace-permissions";
import IUserPolicies from "../policies/user-policies/user-policies-interface";
import IUserEvent from "../events/user/user-events/user-event-interface";
import IUserEventBus from "../events/user/user-event-bus/user-event-bus-interface";
import Namespace from "../entities/namespace";

export default class User extends Aggregate<UUID> {
  private contactInfo: ContactInfo;
  private namespacePermissions: NamespacePermissions[];
  private ssoId: string;

  constructor(
    id: UUID,
    ssoId: string,
    contactInfo: ContactInfo,
    namespacePermissions: NamespacePermissions[]
  ) {
    super(id);
    this.ssoId = ssoId;
    this.contactInfo = contactInfo;
    this.namespacePermissions = [...namespacePermissions];
  }

  createNewUser(
    ssoId: string,
    contactInfo: ContactInfo,
    namespacePermissions: NamespacePermissions[],
    userPolicies: IUserPolicies
  ): User {
    if (!userPolicies.canCreateNewUser(this)) throw Error("to do");
    return new User(randomUUID(), ssoId, contactInfo, namespacePermissions);
  }

  getExistingUser(
    id: UUID,
    ssoId: string,
    contactInfo: ContactInfo,
    namespacePermissions: NamespacePermissions[],
    userPolicies: IUserPolicies
  ): User {
    if (!userPolicies.canViewUser(this)) throw Error("to do");
    return new User(id, ssoId, contactInfo, namespacePermissions);
  }

  getNamespacePermissionsList(): NamespacePermissions[] {
    return this.namespacePermissions;
  }

  getContactInfo(): ContactInfo {
    return this.contactInfo;
  }

  publishUserChanges(
    userPolicies: IUserPolicies,
    event: IUserEvent,
    eventBus: IUserEventBus
  ) {
    if (!userPolicies.canEditUser(this)) throw Error("to do");
    eventBus.publishUserEvent(event);
  }

  handleUserEvent(userEvent: IUserEvent) {
    if (userEvent.getSsoId() == this.ssoId) {
      this.contactInfo = userEvent.getContactInfo();
      this.namespacePermissions = userEvent.getNamespacePermissionsList();
    }
  }

  subscribeToEventBus(eventBus: IUserEventBus) {
    eventBus.subscribeToUserEvent(this);
  }

  getSsoId(): string {
    return this.ssoId;
  }

  getRepresentation(): any {
    return {
      id: this.getId(),
      ssoId: this.getSsoId(),
      contactInfo: {
        firstName: this.contactInfo.getFirstName(),
        lastName: this.contactInfo.getLastName(),
        email: this.contactInfo.getEmail(),
        address: {
          country: this.contactInfo.getAddress().getCountry(),
          city: this.contactInfo.getAddress().getCity(),
          address: this.contactInfo.getAddress().getAddress(),
        },
      },
      namespacePermissions: this.getNamespacePermissionsList().map(
        (namespacePermission) => {
          return {
            namespace: {
              name: namespacePermission.getNamespaceName(),
            },
            permissionList: {
              permissionList:
                namespacePermission.permissionList.getPermissions(),
            },
          };
        }
      ),
    };
  }

  createNamespace(name: string, userPolicies: IUserPolicies): Namespace {
    if (!userPolicies.canCreateNameSpace(this)) throw Error("to do");
    return new Namespace(name);
  }

  updateNamespace(newName: string, userPolicies: IUserPolicies): Namespace {
    if (!userPolicies.canEditNameSpace(this)) throw Error("to do");
    return new Namespace(newName);
  }
}
