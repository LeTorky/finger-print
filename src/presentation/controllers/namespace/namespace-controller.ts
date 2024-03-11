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
import { Request } from "express";
import INamespaceUseCases, {
  INamespaceUseCasesSymbol,
} from "src/application/use-cases/namespace-use-cases/namespace-use-cases-interface";
import NamespaceDTO from "src/infrastructure/data-transfer-objects/namespace-dto";
import ISessionManagement, {
  ISessionManagementSymbol,
} from "src/presentation/services/session-management/session-management-interface";

@Controller("namespace")
export default class NamespaceController {
  sessionManagement: ISessionManagement;
  namespaceUseCases: INamespaceUseCases;
  constructor(
    @Inject(ISessionManagementSymbol) sessionManagement: ISessionManagement,
    @Inject(INamespaceUseCasesSymbol) userUseCases: INamespaceUseCases
  ) {
    this.sessionManagement = sessionManagement;
    this.namespaceUseCases = userUseCases;
  }

  @Post()
  async createNamespace(
    @Req() req: Request,
    @Body("name") name: string
  ): Promise<NamespaceDTO> {
    const session = this.sessionManagement.getSession(req);
    const ssoId = session["ssoId"];
    const createdNamespace = await this.namespaceUseCases.createNewNamespace(
      ssoId,
      name
    );
    return createdNamespace;
  }

  @Get(":name")
  async getNamespace(
    @Req() req: Request,
    @Param("name") name: string
  ): Promise<NamespaceDTO> {
    const session = this.sessionManagement.getSession(req);
    const ssoId = session["ssoId"];
    const fetchedNamespace = await this.namespaceUseCases.getNamespaceByName(
      ssoId,
      name
    );
    return fetchedNamespace;
  }

  @Put(":name")
  async editNamespace(
    @Req() req: Request,
    @Param("name") name: string,
    @Body("namespace") namespace: NamespaceDTO
  ): Promise<NamespaceDTO> {
    const session = this.sessionManagement.getSession(req);
    const ssoId = session["ssoId"];
    const edittedUser = this.namespaceUseCases.editNamespace(
      ssoId,
      name,
      namespace
    );
    return edittedUser;
  }

  @Delete(":name")
  async deleteNamespace(
    @Req() req: Request,
    @Param("name") name: string
  ): Promise<boolean> {
    const session = this.sessionManagement.getSession(req);
    const ssoId = session["ssoId"];
    const deleted = this.namespaceUseCases.deleteNamespace(ssoId, name);
    return deleted;
  }
}
