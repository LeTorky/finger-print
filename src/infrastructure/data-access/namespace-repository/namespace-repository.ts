import Namespace from "src/domain/entities/namespace";
import INamespaceRepository from "./namespace-repository-interface";
import namespaceModel from "src/infrastructure/database-context/models/namespace-model";

export class NamespaceRepository implements INamespaceRepository<string> {
  async getNamespaceById(name: string): Promise<Namespace> {
    const namespaceInstance = await namespaceModel.findById(name);
    if (namespaceInstance) return new Namespace(namespaceInstance.name);
    else throw new Error("to do");
  }

  async createNamespace(nameSpace: Namespace): Promise<Namespace> {
    console.log(nameSpace.getName());
    await namespaceModel.create({
      name: nameSpace.getName(),
    });
    return nameSpace;
  }

  async changeNamespaceId(
    oldName: string,
    namespace: Namespace
  ): Promise<Namespace> {
    const updatedUser = await namespaceModel.findOneAndUpdate(
      { name: oldName },
      { name: namespace.getName() },
      { new: true }
    );
    return new Namespace(updatedUser.name);
  }

  async deleteNamespace(name: string): Promise<boolean> {
    await namespaceModel.deleteOne({ _id: name });
    return true;
  }
}
