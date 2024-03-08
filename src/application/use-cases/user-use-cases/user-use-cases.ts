import User from "src/domain/aggregates/user";
import IUserUseCases from "./user-use-cases-interface";
import IUserRepository, {
  IUserRepositorySymbol,
} from "src/infrastructure/data-access/user-repository/user-repository-interface";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export default class UserUseCases implements IUserUseCases {
  private userRepository: IUserRepository;

  constructor(@Inject(IUserRepositorySymbol) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUserBySsoID(ssoID: string): Promise<User> {
    return await this.userRepository.getUserBySsoId(ssoID);
  }
}
