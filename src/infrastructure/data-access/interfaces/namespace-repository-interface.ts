import Namespace from "src/domain/entities/namespace";

export default interface INamespaceRepository<IdType>{
  getNamespaceById(id: IdType): Promise<Namespace>;
  createNamespace(name: string): Promise<Namespace>;
  changeNamespaceId(namespace: Namespace, newId: IdType): Promise<Namespace>;
}
