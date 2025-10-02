export class Product {
    constructor(
        public id: number,
        public product_name: string,
        public price: number,
        public quantity: number,
        public imageUrl: string,
        public category: ProductCategory,
        public description?: string,
        public available?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
  ) { }

  isAvailable(): boolean {
    return this.quantity > 0;
  }
}

export enum ProductCategory{
    Boulangerie = 0,
    Pâtisserie = 1,
    Snacking = 2,
    Boisson = 3
}
