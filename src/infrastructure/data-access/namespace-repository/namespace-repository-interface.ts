import Namespace from "src/domain/entities/namespace";

export default interface INamespaceRepository<IdType> {
  getNamespaceById(id: IdType): Promise<Namespace>;
  createNamespace(nameSpace: Namespace): Promise<Namespace>;
  changeNamespaceId(oldName: IdType, namespace: Namespace): Promise<Namespace>;
  deleteNamespace(name: string): Promise<boolean>;
}

export const INamespaceRepositorySymbol = Symbol("INamespaceRepository");
