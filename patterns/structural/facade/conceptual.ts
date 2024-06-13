class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  public operation(): string {
    let result = 'Facade initialize subsystem:\n';
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += 'Facade orders subsystems to perform the action:\n';
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();

    return result;
  }
}

class Subsystem1 {
  public operation1(): string {
    return 'Subsystem1: readyyyyy!\n';
  }

  public operationN(): string {
    return 'Subsystem1: Go!\n';
  }
}

class Subsystem2 {
  public operation1(): string {
    return 'Subsystem2: get ready mf!\n';
  }

  public operationZ(): string {
    return 'Subsystem2: FIRE!\n';
  }
}

function clientCode(facade: Facade) {
  // ...
  console.log(facade.operation());
  // ...
}

const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);

/*
 * Facade initialize subsystem:
 * Subsystem1: readyyyyy!
 * Subsystem2: get ready mf!
 * Facade orders subsystems to perform the action:
 * Subsystem1: Go!
 * Subsystem2: FIRE!
 */

clientCode(facade);
