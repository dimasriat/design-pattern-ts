class Singleton {
  static #instance: Singleton;

  private constructor() {}

  public static get instance(): Singleton {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }

    return Singleton.#instance;
  }

  public someBusinessLogic(): void {}
}

function clientCode() {
  const s1 = Singleton.instance;
  const s2 = Singleton.instance;

  if (s1 === s2) {
    console.log('Singleton works, both variable contain the same instance.');
  } else {
    console.log('Singleton failed, variables contain different instances.');
  }
}

// Singleton works, both variable contain the same instance.
clientCode();
