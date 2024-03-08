import UserDTO from "src/infrastructure/data-transfer-objects/user-dto";

export default interface IUserUseCases {
  getUserBySsoID(ssoID: string): Promise<UserDTO>;
}

export const IUserUseCasesSymbol = Symbol("IUserUseCases");
