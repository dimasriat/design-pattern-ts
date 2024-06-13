class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState: any): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);

    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

class FlyweightFactory {
  private flyweights: Record<string, Flyweight> = {};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  private getKey(state: string[]): string {
    return state.join('_');
  }

  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log(
        "FlyweightFactory: Can't find a flyweight, creating new one.",
      );
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log('FlyweightFactory: Reusing existing flyweight.');
    }

    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(`FlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log('-\t' + key);
    }
  }
}

const factory = new FlyweightFactory([
  ['Chevrolet', 'Camaro2018', 'pink'],
  ['Mercedes Benz', 'C300', 'black'],
  ['Mercedes Benz', 'C500', 'red'],
  ['BMW', 'M5', 'red'],
  ['BMW', 'X6', 'white'],
]);

factory.listFlyweights();

interface AddCarToPoliceDatabaseParams {
  ff: FlyweightFactory;
  plates: string;
  owner: string;
  brand: string;
  model: string;
  color: string;
}

function addCarToPoliceDatabase({
  ff,
  plates,
  owner,
  brand,
  model,
  color,
}: AddCarToPoliceDatabaseParams) {
  console.log('Client: Adding a car to database.');
  const flyweight = ff.getFlyweight([brand, model, color]);
  flyweight.operation([plates, owner]);
}

console.log('==========');

addCarToPoliceDatabase({
  ff: factory,
  plates: 'CL234IR',
  owner: 'James Doe',
  brand: 'BMW',
  model: 'M5',
  color: 'red',
});

console.log('==========');

addCarToPoliceDatabase({
  ff: factory,
  plates: 'CL234IR',
  owner: 'James Doe',
  brand: 'BMW',
  model: 'X1',
  color: 'red',
});

console.log('==========');

factory.listFlyweights();

/*
 * FlyweightFactory: I have 5 flyweights:
 * -       Chevrolet_Camaro2018_pink
 * -       Mercedes Benz_C300_black
 * -       Mercedes Benz_C500_red
 * -       BMW_M5_red
 * -       BMW_X6_white
 * ==========
 * Client: Adding a car to database.
 * FlyweightFactory: Reusing existing flyweight.
 * Flyweight: Displaying shared (["BMW","M5","red"]) and unique (["CL234IR","James Doe"]) state.
 * ==========
 * Client: Adding a car to database.
 * FlyweightFactory: Can't find a flyweight, creating new one.
 * Flyweight: Displaying shared (["BMW","X1","red"]) and unique (["CL234IR","James Doe"]) state.
 * ==========
 * FlyweightFactory: I have 6 flyweights:
 * -       Chevrolet_Camaro2018_pink
 * -       Mercedes Benz_C300_black
 * -       Mercedes Benz_C500_red
 * -       BMW_M5_red
 * -       BMW_X6_white
 * -       BMW_X1_red
 */
