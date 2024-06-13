interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  public operation(): string {
    return 'ConcreteComponent';
  }
}

class Decorator extends ConcreteComponent {
  protected component: Component;

  constructor(component: Component) {
    super();
    this.component = component;
  }

  public operation(): string {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

/*
 * Client: Now I've got a simple component:
 * Result: ConcreteComponent
 * ==========
 * Client: Now I've got a decorated component:
 * Result: ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))
 *
 */

function clientCode(component: Component) {
  // ...
  console.log(`Result: ${component.operation()}`);
  // ...
}

const simple = new ConcreteComponent();
console.log("Client: Now I've got a simple component:");
clientCode(simple);

console.log('==========');

const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);

console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
