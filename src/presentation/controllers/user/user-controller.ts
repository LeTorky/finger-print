import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { UUID } from "crypto";
import { Request } from "express";
import IUserUseCases, {
  IUserUseCasesSymbol,
} from "src/application/use-cases/user-use-cases/user-use-cases-interface";
import UserDTO from "src/infrastructure/data-transfer-objects/user-dto";
import ISessionManagement, {
  ISessionManagementSymbol,
} from "src/presentation/services/session-management/session-management-interface";

@Controller("user")
export default class UserController {
  sessionManagement: ISessionManagement;
  userUseCases: IUserUseCases;
  constructor(
    @Inject(ISessionManagementSymbol) sessionManagement: ISessionManagement,
    @Inject(IUserUseCasesSymbol) userUseCases: IUserUseCases
  ) {
    this.sessionManagement = sessionManagement;
    this.userUseCases = userUseCases;
  }

  @Post()
  async createUser(
    @Req() req: Request,
    @Body("user") userToCreate: UserDTO
  ): Promise<UserDTO> {
    const session = this.sessionManagement.getSession(req);
    const ssoId = session["ssoId"];
    const createdUser = this.userUseCases.createNewUser(userToCreate, ssoId);
    return createdUser;
  }

  @Get(":id")
  async getUserBySsoId(
    @Req() req: Request,
    @Param("id") ssoIdToGet: string
  ): Promise<UserDTO> {
    const session = this.sessionManagement.getSession(req);
    const ssoId = session["ssoId"];
    const fetchedUser = this.userUseCases.getUserBySsoID(ssoId, ssoIdToGet);
    return fetchedUser;
  }

  @Put()
  async editUser(
    @Req() req: Request,
    @Body("user") userToEdit: UserDTO
  ): Promise<UserDTO> {
    const session = this.sessionManagement.getSession(req);
    const ssoId = session["ssoId"];
    const edittedUser = this.userUseCases.editUser(userToEdit, ssoId);
    return edittedUser;
  }

  @Delete(":id")
  async deleteUser(
    @Req() req: Request,
    @Param("id") id: UUID
  ): Promise<boolean> {
    const session = this.sessionManagement.getSession(req);
    const ssoId = session["ssoId"];
    const deleted = await this.userUseCases.deleteUser(id, ssoId);
    return deleted;
  }
}
