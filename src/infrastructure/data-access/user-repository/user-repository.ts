import User from "src/domain/aggregates/user";
import IUserRepository from "./user-repository-interface";
import userModel from "src/infrastructure/database-context/models/user-model";
import { UUID } from "crypto";
import Address from "src/domain/value-objects/address";
import ContactInfo from "src/domain/value-objects/contact-info";
import Namespace from "src/domain/entities/namespace";
import NamespacePermissions from "src/domain/value-objects/namespace-permissions";
import Permissions from "src/domain/value-objects/permissions";
import IUser from "src/domain/interfaces/user-interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class UserRepository implements IUserRepository<UUID> {
  async createUser(user: User): Promise<User> {
    await userModel.create(user.getRepresentation());
    return user;
  }

  private modelToUser(userData: IUser): User {
    const address: Address = new Address(
      userData.contactInfo?.address?.country,
      userData.contactInfo?.address?.city,
      userData.contactInfo?.address?.address
    );

    const contactInfo: ContactInfo = new ContactInfo(
      userData.contactInfo?.firstName,
      userData.contactInfo?.lastName,
      userData.contactInfo?.email,
      address
    );

    const namespacePermissions = userData.namespacePermissions.map(
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

    return new User(
      userData.id,
      userData.ssoId,
      contactInfo,
      namespacePermissions
    );
  }

  async getUserById(id: UUID): Promise<User> {
    const user = await userModel.findById(id);
    return this.modelToUser(user);
  }

  async getUserBySsoId(ssoId: string): Promise<User> {
    const user = await userModel.findOne({ ssoId: ssoId });
    return this.modelToUser(user);
  }

  async saveUser(userToSave: User): Promise<User> {
    await userModel.updateOne(
      { _id: userToSave.getId() },
      userToSave.getRepresentation()
    );
    return userToSave;
  }

  async deleteUser(id: UUID): Promise<boolean> {
    await userModel.deleteOne({
      id: id,
    });
    return true;
  }
}
