import Namespace from "src/domain/entities/namespace";
import INamespaceRepository from "../interfaces/namespace-repository-interface";
import namespaceModel from "src/infrastructure/database-models/namespace-model";
import { Types } from "mongoose";

type ObjectId = Types.ObjectId;

export class NamespaceRepository implements INamespaceRepository<ObjectId>{
  async getNamespaceById(id: ObjectId): Promise<Namespace>{
    const namespaceInstance = await namespaceModel.findById(id);
    if (namespaceInstance)
      return new Namespace(namespaceInstance._id, namespaceInstance.name);
    else throw new Error('Not found!');
  }
  async createNamespace(name: string): Promise<Namespace>{
    const newUser = await namespaceModel.create({
      name: name,
    });
    return new Namespace(newUser._id, newUser.name);
  }
  async changeNamespaceId(
    namespace: Namespace,
    newId: ObjectId,
  ): Promise<Namespace> {
    const updatedUser = await namespaceModel.findOneAndUpdate(
      { name: namespace.getName() },
      { _id: newId },
      { new: true },
    );
    return new Namespace(updatedUser._id, updatedUser.name);
  }
}
