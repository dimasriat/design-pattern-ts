class MyClassBefore {
  private platform: string = 'MACOS';
  private browser: string = 'IE';
  private resize: number = 30;

  public wasInitialized(): boolean {
    return true;
  }

  // TODO(dims): SMELLY CODE
  // https://refactoring.guru/extract-variable
  //
  // Problem:
  //    You have an expression that’s hard to understand.
  // Solution:
  //    Place the result of the expression or its parts in separate variables
  //    that are self-explanatory.
  public renderBanner(): void {
    if (
      this.platform.toUpperCase().indexOf('MAC') > -1 &&
      this.browser.toUpperCase().indexOf('IE') > -1 &&
      this.wasInitialized() &&
      this.resize > 0
    ) {
      // do something...
    }
  }
}

class MyClassAfter {
  private platform: string = 'MACOS';
  private browser: string = 'IE';
  private resize: number = 30;

  public wasInitialized(): boolean {
    return true;
  }

  public renderBanner(): void {
    const isMacOS = this.platform.toUpperCase().indexOf('MAC') > -1;
    const isIE = this.browser.toUpperCase().indexOf('IE') > -1;
    const wasResized = this.resize > 0;

    if (isMacOS && isIE && this.wasInitialized() && wasResized) {
      // do something...
    }
  }
}
