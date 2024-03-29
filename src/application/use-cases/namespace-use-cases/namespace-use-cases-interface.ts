import NamespaceDTO from "src/infrastructure/data-transfer-objects/namespace-dto";

export default interface INamespaceUseCases {
  getNamespaceByName(callerSsoID: string, name: string): Promise<NamespaceDTO>;
  createNewNamespace(callerSsoID: string, name: string): Promise<NamespaceDTO>;
  editNamespace(
    callerSsoID: string,
    namespaceName: string,
    namespace: NamespaceDTO
  ): Promise<NamespaceDTO>;
  deleteNamespace(callerSsoID: string, name: string): Promise<boolean>;
  getAllNamespaces(callerSsoID: string): Promise<NamespaceDTO[]>;
}

export const INamespaceUseCasesSymbol = Symbol("INamespaceUseCases");
