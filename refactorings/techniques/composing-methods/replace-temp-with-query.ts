class MyClassBefore {
  private quantity: number = 42;
  private itemPrice: number = 69;

  public getQuantity(): number {
    return this.quantity;
  }

  public getItemPrice(): number {
    return this.itemPrice;
  }

  // TODO(dims): SMELLY CODE
  // https://refactoring.guru/replace-temp-with-query
  //
  // Problem:
  //    You place the result of an expression in a local variable for later use
  //    in your code.
  // Solution:
  //    Move the entire expression to a separate method and return the result
  //    from it. Query the method instead of using a variable. Incorporate the
  //    new method in other methods, if necessary.
  public calculateTotal(): number {
    const basePrice = this.getQuantity() * this.getItemPrice();
    if (basePrice > 1000) {
      return basePrice * 0.95;
    } else {
      return basePrice * 0.98;
    }
  }
}

class MyClassAfter {
  private quantity: number = 42;
  private itemPrice: number = 69;

  public getQuantity(): number {
    return this.quantity;
  }

  public getItemPrice(): number {
    return this.itemPrice;
  }

  public getBasePrice(): number {
    return this.getBasePrice() * this.getQuantity();
  }

  public calculateTotal(): number {
    if (this.getBasePrice() > 1000) {
      return this.getBasePrice() * 0.95;
    } else {
      return this.getBasePrice() * 0.98;
    }
  }
}
