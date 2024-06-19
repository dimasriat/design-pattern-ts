/*//////////////////////////////////////////////////////////////////////////////
                                     Before                                           
//////////////////////////////////////////////////////////////////////////////*/

class MyClassBefore {
  private compoundedPerYear: number = 12;

  public async getTvlUsd(): Promise<number> {
    return 420;
  }

  public async getDailyRewardUsd(): Promise<number> {
    return 0.69;
  }

  // TODO(dims): SMELLY CODE
  // https://refactoring.guru/replace-method-with-method-object
  //
  // Problem:
  //    You have a long method in which the local variables are so intertwined
  //    that you can’t apply Extract Method.
  // Solution:
  //    Transform the method into a separate class so that the local variables
  //    become fields of the class. Then you can split the method into several
  //    methods within the same class.
  public async getApy(): Promise<number> {
    const tvlUsd = await this.getTvlUsd();
    const dailyRewardUsd = await this.getDailyRewardUsd();
    const apr = (dailyRewardUsd * 365) / tvlUsd;
    const apy =
      (1 + apr / this.compoundedPerYear) ** this.compoundedPerYear * 100;

    return apy;
  }
}

/*//////////////////////////////////////////////////////////////////////////////
                                     After                                           
//////////////////////////////////////////////////////////////////////////////*/

class MyClassAfter {
  private compoundedPerYear: number = 12;

  public async getApy(): Promise<number> {
    const calculator = new VaultCalculator(this, this.compoundedPerYear);
    return await calculator.getApy();
  }

  public async getTvlUsd(): Promise<number> {
    return 420;
  }

  public async getDailyRewardUsd(): Promise<number> {
    return 0.69;
  }
}

class VaultCalculator {
  private vault: MyClassAfter;
  private compoundedPerYear: number = 12;

  constructor(vault: MyClassAfter, compoundedPerYear: number) {
    this.vault = vault;
    this.compoundedPerYear = compoundedPerYear;
  }

  public async getApy(): Promise<number> {
    const apr = await this.getApr();
    const apy = this.calculateApy(apr, this.compoundedPerYear);

    return apy;
  }

  public calculateApy(apr: number, compoundedPerYear: number): number {
    return (1 + apr / compoundedPerYear) ** compoundedPerYear * 100;
  }

  public async getApr(): Promise<number> {
    const tvlUsd = await this.vault.getTvlUsd();
    const dailyRewardUsd = await this.vault.getDailyRewardUsd();
    const apr = this.calculateApr(dailyRewardUsd, tvlUsd);

    return apr;
  }

  public calculateApr(dailyRewardUsd: number, tvlUsd: number): number {
    return (dailyRewardUsd * 365) / tvlUsd;
  }
}
