import User from "src/domain/aggregates/user";

export default interface IUserRepository{
  createUser(user: User): Promise<User>;
}