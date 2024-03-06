export default class ValueObject{
  private areElementsEqual(firstSet: any[], secondSet: any[]): boolean{
    let equality = true;

    // Assert that length of members are the same.
    if (firstSet.length !== secondSet.length) throw new Error('Test');

    // Assert that values are equal for all members.
    for (let i: number = 0; i < firstSet.length && equality; ++i) {
      if (firstSet[i] instanceof ValueObject)
        // Recursive equality check for nested ValueObjects.
        equality = firstSet[i].isEqual(secondSet[i]);
      else if (firstSet[i] instanceof Array)
        equality = this.areElementsEqual(firstSet[i], secondSet[i]);
      else if (firstSet[i] instanceof Set)
        equality = this.areElementsEqual([...firstSet[i]], [...secondSet[i]]);
      else equality = firstSet[i] === secondSet[i];
    }
    return equality;
  }

  isEqual(other: ValueObject): boolean {
    // Get values in each instance.
    const CurrentValues: any[] = Object.values(this);
    const OtherValues: any[] = Object.values(other);

    // Assert that types of objects are the same.
    if (this.constructor !== other.constructor) throw new Error('Test');

    // Assert that member values are the same.
    return this.areElementsEqual(CurrentValues, OtherValues);
  }
}
