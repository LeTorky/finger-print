import Namespace from "src/domain/entities/namespace";
import INamespaceEvent from "../namespace-events/namespace-event-interface";

export default interface INamespaceEventBus {
  publishUserEvent(userEvent: INamespaceEvent): void;
  subscribeToUserEvent(namespace: Namespace): void;
}

export const INamespaceEventBusSymbol = Symbol("INamespaceEventBus");
