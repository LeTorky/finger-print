import { UUID } from "crypto";
import User from "src/domain/aggregates/user";

export default interface IUserRepository {
  createUser(user: User): Promise<User>;

  getUserById(id: UUID): Promise<User>;

  getUserBySsoId(ssoId: string): Promise<User>;
}

export const IUserRepositorySymbol = Symbol("IUserRepository");
