abstract class State {
  protected context: Context | undefined;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

class NullState extends State {
  public handle1(): void {}

  public handle2(): void {}
}

class Context {
  private state: State;

  constructor(state: State) {
    this.state = new NullState();
    this.transitionTo(state);
  }

  public transitionTo(state: State) {
    console.log(`Context: Transition to ${state.constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

class ConcreteStateA extends State {
  public handle1(): void {
    if (this.context) {
      console.log('ConcreteStateA: handles request1.');
      console.log('ConcreteStateA: wants to change the state of the context.');
      this.context.transitionTo(new ConcreteStateB());
    }
  }

  public handle2(): void {
    console.log('ConcreteStateA: handles request2.');
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    if (this.context) {
      console.log('ConcreteStateB: handles request1.');
      console.log('ConcreteStateB: wants to change the state of the context.');
      this.context.transitionTo(new ConcreteStateA());
    }
  }

  public handle2(): void {
    console.log('ConcreteStateB: handles request2.');
  }
}

const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
