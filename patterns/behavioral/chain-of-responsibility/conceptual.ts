// https://refactoring.guru/design-patterns/chain-of-responsibility/typescript/example

interface Handler<Request = string, Result = string> {
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>;
  handle(request: Request): Result;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | undefined;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return '';
  }
}

class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Banana') {
      return "Monkey: I'll eat the " + request;
    }

    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Nut') {
      return "Squirrel: I'll eat the " + request;
    }

    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Meatball') {
      return "Dog: I'll eat the " + request;
    }

    return super.handle(request);
  }
}

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

function clientCode(foods: string[], handler: Handler) {
  for (const food of foods) {
    console.log(`Client: who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(`>  ${result}`);
    } else {
      console.log(`>  ${result} WAS LEFT UNTOUCHED.`);
    }
  }
}

const FOODS = ['Nut', 'Banana', 'Cup of Coffee'];

clientCode(FOODS, monkey);
console.log('');

clientCode(FOODS, squirrel);
console.log('');
