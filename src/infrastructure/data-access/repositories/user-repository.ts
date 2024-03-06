import User from "src/domain/aggregates/user";
import IUserRepository from "../interfaces/user-repository-interface";
import userModel from "src/infrastructure/database-models/user-model";

export default class UserRepository implements IUserRepository{
  async createUser(user: User): Promise<User>{
    await userModel.create({
      id: user.getId(),
      ssoId: user.getSsoId(),
      contactInfo: {
        firstName: user.getContactInfo().getFirstName(),
        lastName: user.getContactInfo().getLastName(),
        email: user.getContactInfo().getEmail(),
      },
      namespacePermissions: user.getNamespacePermissionsList(),
    })
    return user;
  }
}
