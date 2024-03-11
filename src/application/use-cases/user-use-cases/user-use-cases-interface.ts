import { UUID } from "crypto";
import UserDTO from "src/infrastructure/data-transfer-objects/user-dto";

export default interface IUserUseCases {
  getUserBySsoID(
    callerSsoID: string,
    userSsoIdToFetch: string
  ): Promise<UserDTO>;
  createNewUser(userToCreate: UserDTO, callerSsoID: string): Promise<UserDTO>;
  editUser(edittedUser: UserDTO, callerSsoID: string): Promise<UserDTO>;
  deleteUser(id: UUID, callerSsoID: string): Promise<boolean>;
  getAllUsers(callerSsoID: string): Promise<UserDTO[]>;
}

export const IUserUseCasesSymbol = Symbol("IUserUseCases");
