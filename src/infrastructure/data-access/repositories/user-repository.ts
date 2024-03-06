import User from "src/domain/aggregates/user";
import IUserRepository from "../interfaces/user-repository-interface";
import userModel from "src/infrastructure/database-models/user-model";

export default class UserRepository implements IUserRepository{
  async createUser(user: User): Promise<User>{
    await userModel.create({
      id: user.getId(),
      ssoId: user.getSsoId(),
      contactInfo: {
        firstName: user.contactInfo.getFirstName(),
        lastName: user.contactInfo.getLastName(),
        email: user.contactInfo.getEmail(),
      },
      namespacePermissions: user.getNamespacePermissionsList(),
    })
    return user;
  }
}
