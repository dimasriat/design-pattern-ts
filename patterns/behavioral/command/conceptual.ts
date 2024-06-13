interface Command {
  execute(): void;
}

class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`,
    );
  }
}

class ComplexCommand implements Command {
  private receiver: Receiver;

  private a: string;

  private b: string;

  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  public execute(): void {
    console.log(
      'ComplexCommand: Complex stuff should be done by a receiver object.',
    );

    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a}.)`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also Working on (${b}.)`);
  }
}

class Invoker {
  private onStart: Command | undefined;
  private onFinish: Command | undefined;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.onStart) {
      this.onStart.execute();
    }

    console.log('Invoker: ...doing something really important...');

    console.log(
      'Invoker: Does anybody want something to be done after I finish?',
    );
    if (this.onFinish) {
      this.onFinish.execute();
    }
  }
}

/*
 * Invoker: Does anybody want something done before I begin?
 * SimpleCommand: See, I can do simple things like printing (Say Hi!)
 *
 * Invoker: ...doing something really important...
 *
 * Invoker: Does anybody want something to be done after I finish?
 * ComplexCommand: Complex stuff should be done by a receiver object.
 * Receiver: Working on (Send Email.)
 * Receiver: Also Working on (Save Report.)
 *
 */

const receiver = new Receiver();

const simpleCommand = new SimpleCommand('Say Hi!');
const complexCommand = new ComplexCommand(
  receiver,
  'Send Email',
  'Save Report',
);

const invoker = new Invoker();

invoker.setOnStart(simpleCommand);
invoker.setOnFinish(complexCommand);

invoker.doSomethingImportant();
