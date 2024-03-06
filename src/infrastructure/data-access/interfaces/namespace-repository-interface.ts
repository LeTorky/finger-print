import Namespace from "src/domain/entities/namespace";

export default interface INamespaceRepository<IdType>{
  getNamespaceById(id: IdType): Promise<Namespace>;
  createNamespace(nameSpace: Namespace): Promise<Namespace>;
  changeNamespaceId(namespace: Namespace, newName: IdType): Promise<Namespace>;
}
