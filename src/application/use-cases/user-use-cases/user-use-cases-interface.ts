import User from "src/domain/aggregates/user";

export default interface IUserUseCases {
  getUserBySsoID(ssoID: string): Promise<User>;
}

export const IUserUseCasesSymbol = Symbol("IUserUseCases");
