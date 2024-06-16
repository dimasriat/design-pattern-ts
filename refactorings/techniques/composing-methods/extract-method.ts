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

  // TODO(dims): NEED TO BE REFACTORED
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
