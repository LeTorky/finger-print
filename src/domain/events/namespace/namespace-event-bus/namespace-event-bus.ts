import { error } from "console";
import INamespaceEvent from "../namespace-events/namespace-event-interface";
import INamespaceEventBus from "./namespace-event-bus-interface";
import { Injectable } from "@nestjs/common";
import Namespace from "src/domain/entities/namespace";

@Injectable()
export default class NamespaceEventBus implements INamespaceEventBus {
  private subscribers: Namespace[] = [];

  publishUserEvent(namespaceEvent: INamespaceEvent): void {
    //TODO: need to finish this part.
    throw error("need to finish");
  }

  subscribeToUserEvent(namespace: Namespace): void {
    this.subscribers.push(namespace);
  }
}
