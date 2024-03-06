import Namespace from "src/domain/entities/namespace";
import INamespaceRepository from "../interfaces/namespace-repository-interface";
import namespaceModel from "src/infrastructure/database-models/namespace-model";

export class NamespaceRepository implements INamespaceRepository<string>{
  async getNamespaceById(name: string): Promise<Namespace>{
    const namespaceInstance = await namespaceModel.findById(name);
    if (namespaceInstance) return new Namespace(namespaceInstance.name);
    else throw new Error('Not found!');
  }

  async createNamespace(nameSpace: Namespace): Promise<Namespace>{
    await namespaceModel.create({
      name: nameSpace.getName(),
    });
    return nameSpace;
  }

  async changeNamespaceId(
    namespace: Namespace,
    newName: string,
  ): Promise<Namespace> {
    const updatedUser = await namespaceModel.findOneAndUpdate(
      { name: namespace.getName() },
      { name: newName },
      { new: true },
    );
    return new Namespace(updatedUser.name);
  }
}
