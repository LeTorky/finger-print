import { UUID } from "crypto";
import User from "src/domain/aggregates/user";

export default interface IUserRepository<IdType> {
  createUser(user: User): Promise<User>;

  getUserById(id: IdType): Promise<User>;

  getAllUsers(): Promise<User[]>;

  getUserBySsoId(ssoId: string): Promise<User>;

  saveUser(userToSave: User): Promise<User>;

  deleteUser(id: IdType): Promise<boolean>;
}

export const IUserRepositorySymbol = Symbol("IUserRepository");
