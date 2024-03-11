import INamespaceEvent from "./namespace-event-interface";

export default class NamespaceEvent implements INamespaceEvent {
  private oldName: string;
  private newName: string;

  constructor(oldName: string, newName: string) {
    this.oldName = oldName;
    this.newName = newName;
  }

  getNewName(): string {
    return this.newName;
  }

  getOldName(): string {
    return this.oldName;
  }
}
