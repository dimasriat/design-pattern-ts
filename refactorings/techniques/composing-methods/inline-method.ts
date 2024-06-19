class MyClassBefore {
  private numberOfLateDeliveries: number = 10;

  // TODO(dims): SMELLY CODE
  // https://refactoring.guru/inline-method
  //
  // Problem:
  //      When a method body is more obvious than the method itself,
  //      use this technique (inline method).
  // Solution:
  //      Replace calls to the method with the method’s content and delete the
  //      method itself.
  public getRating(): number {
    return this.moreThanFiveLateDeliveries() ? 2 : 1;
  }

  public moreThanFiveLateDeliveries(): boolean {
    return this.numberOfLateDeliveries > 5;
  }
}

class MyClassAfter {
  private numberOfLateDeliveries: number = 10;

  public getRating(): number {
    return this.numberOfLateDeliveries > 5 ? 2 : 1;
  }
}
