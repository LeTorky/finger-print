import { UUID } from "crypto";
import User from "src/domain/aggregates/user";

export default interface IUserRepository {
  createUser(user: User): Promise<User>;

  getUserById(id: UUID): Promise<User>;

  getUserBySsoId(ssoId: string): Promise<User>;

  saveUser(userToSave: User): Promise<User>;

  deleteUser(id: UUID): Promise<boolean>;
}

export const IUserRepositorySymbol = Symbol("IUserRepository");
