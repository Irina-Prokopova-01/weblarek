import { IProduct } from "../../types"
import { IEvents } from "../base/Events.ts";

export class Products {
    private products: IProduct[] = [];
    private selectProduct: IProduct | null = null;

    constructor(private events: IEvents) {}
    saveProducts(products: IProduct[]): void {
        this.products = [...products];
        this.events.emit("catalog:changed");
    }

    getProducts(): IProduct [] {
        return [...this.products];
    }


    getProductById(id:string): IProduct | undefined {
        return  this.products.find(product => product.id === id);
    }

    saveSelectProduct(product: IProduct): void {
        this.selectProduct = product;
        this.events.emit("preview:changed");
    }

    getSelectProduct(): IProduct | null {
        return this.selectProduct;
    }

    addProduct(product: IProduct): void {
        this.products.push(product);
        this.events.emit("basket:changed");
    }

    deleteProduct(product: IProduct): void {
        this.products = this.products.filter((item) => item.id !== product.id);
        this.events.emit("basket:changed");
    }

    clearProduct(): void {
        this.products = [];
        this.events.emit("basket:changed");
    }
}