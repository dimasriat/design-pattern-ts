interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
  private product: Product1;

  constructor() {
    this.product = new Product1();
  }

  public reset(): void {
    this.product = new Product1();
  }

  public producePartA(): void {
    this.product.parts.push('PartA1');
  }

  public producePartB(): void {
    this.product.parts.push('PartB1');
  }

  public producePartC(): void {
    this.product.parts.push('PartC1');
  }

  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}

class Product1 {
  public parts: string[] = [];
  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}`);
  }
}

class Director {
  private builder: Builder | undefined;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    if (this.builder) this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    if (this.builder) this.builder.producePartA();
    if (this.builder) this.builder.producePartB();
    if (this.builder) this.builder.producePartC();
  }
}

function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log('Standard basic product:');
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log('==========');

  console.log('Standard full featured product:');
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  console.log('==========');

  console.log('Custom product:');
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);

/*
 * Standard basic product:
 * Product parts: PartA1
 * ==========
 * Standard full featured product:
 * Product parts: PartA1, PartB1, PartC1
 * ==========
 * Custom product:
 * Product parts: PartA1, PartC1
 *
 */
