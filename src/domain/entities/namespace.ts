import Entity from "../common/entity";

export default class Namespace extends Entity<string>{
  constructor(name: string) {
    super(name);
  }
  getName(): string{
    return this.getId();
  }
};
