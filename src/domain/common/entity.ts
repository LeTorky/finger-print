export default class Entity<IdType>{
  private id: IdType;

  isEqual(other: Entity<IdType>): boolean {
    // Assert that types of objects are the same.
    if (this.constructor != other.constructor) throw new Error('Test');
    // Assert on ID equality.
    return this.getId() === other.getId() ? true : false;
  }

  // ID getter to prevent changing its value.
  getId(): IdType{
    return this.id;
  }

  protected constructor(id: IdType){
    this.id = id;
  }
}
