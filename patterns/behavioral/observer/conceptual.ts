interface Observer {
  update(subject: Subject): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class ConcreteSubject implements Subject {
  // public state: number;
  public state: number = 0;
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }

    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      return console.log('Subject: Nonexistent observer');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detach an observer.');
  }

  public notify(): void {
    console.log('Subject: notifying observers...');
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public someBusinessLogic(): void {
    console.log("Subject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}

class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log('ConcreteObserverA: Reacted to event.');
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log('ConcreteObserverB: Reacted to event.');
    }
  }
}

/*
 * Subject: Attached an observer.
 * Subject: Attached an observer.
 * Subject: I'm doing something important.
 * Subject: My state has just changed to: 1
 * Subject: notifying observers...
 * ConcreteObserverA: Reacted to event.
 * Subject: I'm doing something important.
 * Subject: My state has just changed to: 7
 * Subject: notifying observers...
 * ConcreteObserverB: Reacted to event.
 * Subject: Nonexistent observer
 * Subject: I'm doing something important.
 * Subject: My state has just changed to: 6
 * Subject: notifying observers...
 * ConcreteObserverB: Reacted to event.
 *
 */

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observer2);

subject.someBusinessLogic();
