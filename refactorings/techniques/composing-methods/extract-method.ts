class MyClassBefore {
  private name = 'Dimas';
  private amount = 69420;

  public getName(): string {
    return this.name;
  }

  public getOutstanding(): number {
    return this.amount;
  }

  public printBanner(): void {
    console.log('THIS IS A BANNER');
  }

  // TODO(dims): SMELLY CODE
  // https://refactoring.guru/extract-method
  //
  // Problem:
  //    You have a code fragment that can be grouped together.
  // Solution:
  //    Move this code to a separate new method (or function) and replace the
  //    old code with a call to the method.
  public printOwing(): void {
    this.printBanner();

    // print details
    console.log('Name:', this.getName());
    console.log('Amount:', this.getOutstanding());
  }
}

class MyClassAfter {
  private name = 'Dimas';
  private amount = 69420;

  public getName(): string {
    return this.name;
  }

  public getOutstanding(): number {
    return this.amount;
  }

  public printBanner(): void {
    console.log('THIS IS A BANNER');
  }

  // REFACTORED(dims): "Extract Method"
  public printOwing(): void {
    this.printBanner();

    this.printDetails();
  }

  private printDetails(): void {
    console.log('Name:', this.getName());
    console.log('Amount:', this.getOutstanding());
  }
}
