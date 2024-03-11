import Entity from "../common/entity";
import INamespaceEvent from "../events/namespace/namespace-events/namespace-event-interface";
import INamespace from "../interfaces/namespace-interface";

export default class Namespace extends Entity<string> {
  constructor(name: string) {
    super(name);
  }

  getName(): string {
    return this.getId();
  }

  getRepresentation() {
    return {
      name: this.getName(),
    };
  }
}
