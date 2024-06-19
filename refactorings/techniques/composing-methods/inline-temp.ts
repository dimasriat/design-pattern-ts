class MyClassBefore {
  // TODO(dims): SMELLY CODE
  // https://refactoring.guru/inline-temp
  //
  // Problem:
  //    You have a temporary variable that’s assigned the result of a simple
  //    expression and nothing more.
  // Solution:
  //    Replace the references to the variable with the expression itself.
  public hasDiscount(order: Order): boolean {
    const basePrice: number = order.getBasePrice();
    return basePrice > 1000;
  }
}

class MyClassAfter {
  public hasDiscount(order: Order): boolean {
    return order.getBasePrice() > 1000;
  }
}

class Order {
  private basePrice: number = 420;

  public getBasePrice(): number {
    return this.basePrice;
  }
}
