import Namespace from "src/domain/entities/namespace";
import INamespaceRepository from "./namespace-repository-interface";
import namespaceModel from "src/infrastructure/database-context/models/namespace-model";
import userModel from "src/infrastructure/database-context/models/user-model";

export class NamespaceRepository implements INamespaceRepository<string> {
  async getNamespaceById(name: string): Promise<Namespace> {
    const namespaceInstance = await namespaceModel.findById(name);
    if (!namespaceInstance) return null;
    return new Namespace(namespaceInstance.name);
  }
  async getAllNamespaces(): Promise<Namespace[]> {
    const namespaceInstances = await namespaceModel.find();
    return namespaceInstances.map((namespace) => new Namespace(namespace.name));
  }

  async createNamespace(nameSpace: Namespace): Promise<Namespace> {
    await namespaceModel.create({
      name: nameSpace.getName(),
    });
    return nameSpace;
  }

  async changeNamespaceId(
    oldName: string,
    namespace: Namespace
  ): Promise<Namespace> {
    const newNamespace = await this.createNamespace(namespace);
    await userModel.updateMany(
      { "namespacePermissions.namespace": oldName },
      {
        $set: {
          "namespacePermissions.$[element].namespace": newNamespace.getName(),
        },
      },
      {
        arrayFilters: [{ "element.namespace": oldName }],
      }
    );
    await this.deleteNamespace(oldName);
    return namespace;
  }

  async deleteNamespace(name: string): Promise<boolean> {
    const deletedCount = await namespaceModel.deleteOne({ _id: name });
    const deleted = Boolean(deletedCount.deletedCount);
    return deleted;
  }
}
