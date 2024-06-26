import { origin } from 'bun';

class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state}`);
  }

  public doSomething(): void {
    console.log("Originator: I'm doing something important.");
    this.state = this.generateRandomString(30);
    console.log(`Originator: and my state has changed to: ${this.state}`);
  }

  private generateRandomString(length: number = 10): string {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // generate random string
    const state = Array.from(
      { length },
      () => charSet[Math.floor(Math.random() * charSet.length)],
    ).join('');

    return state;
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Originator: My state has changed to: ${this.state}`);
  }
}

interface Memento {
  getState(): string;
  getName(): string;
  getDate(): string;
}

class ConcreteMemento implements Memento {
  private state: string;
  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} / (${this.state.substring(0, 9)}...)`;
  }

  public getDate(): string {
    return this.date;
  }
}

class Caretaker {
  private mementos: Memento[] = [];

  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log("Caretaker: Saving Originator's state...");
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    const memento = this.mementos.pop();

    if (!memento) return;

    console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
    this.originator.restore(memento);
  }

  public showHistory(): void {
    console.log("Caretaker: Here's the list of mementos:");
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

/*
 * Originator: My initial state is: dimas-riatmodjo
 * Caretaker: Saving Originator's state...
 * Originator: I'm doing something important.
 * Originator: and my state has changed to: DbIzfazDaiPZSJAKvbfaNczrHhzljJ
 * Caretaker: Saving Originator's state...
 * Originator: I'm doing something important.
 * Originator: and my state has changed to: IvKElJtgMhxstEfbktvBMSvHdLNswP
 * Caretaker: Saving Originator's state...
 * Originator: I'm doing something important.
 * Originator: and my state has changed to: eqXqrQbYCvWPfygtwIMSKqEwXSdFGs
 * ==========
 * Caretaker: Here's the list of mementos:
 * 2024-06-15 12:23:38 / (dimas-ria...)
 * 2024-06-15 12:23:38 / (DbIzfazDa...)
 * 2024-06-15 12:23:38 / (IvKElJtgM...)
 * ==========
 * Client: Now, let's rollback!
 * Caretaker: Restoring state to: 2024-06-15 12:23:38 / (IvKElJtgM...)
 * Originator: My state has changed to: IvKElJtgMhxstEfbktvBMSvHdLNswP
 * ==========
 * Client: Once more!
 * Caretaker: Restoring state to: 2024-06-15 12:23:38 / (DbIzfazDa...)
 * Originator: My state has changed to: DbIzfazDaiPZSJAKvbfaNczrHhzljJ
 *
 */

const originator = new Originator('dimas-riatmodjo');
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('==========');

caretaker.showHistory();

console.log('==========');

console.log("Client: Now, let's rollback!");
caretaker.undo();

console.log('==========');

console.log('Client: Once more!');
caretaker.undo();
