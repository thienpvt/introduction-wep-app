export class ProductModel {
    id: string;
    name: string;
    brand: string;
    category: string;
    model: string;
    voltage: string;
    power: string;
    price: number;
    image: string[];
    status: number;
    description: string[];

    constructor(
        id: string,
        name: string,
        brand: string,
        category: string,
        model: string,
        voltage: string,
        power: string,
        price: number,
        image: string[],
        status: number,
        description: string[]
    ) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.model = model;
        this.voltage = voltage;
        this.power = power;
        this.price = price;
        this.image = image;
        this.status = status;
        this.description = description;
    }
}
