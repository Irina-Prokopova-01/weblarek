import { IProduct } from "../../types";
import { IEvents } from "../base/Events.ts";

export  class Basket{
    private products: IProduct[] = [];

    constructor(private events: IEvents) {}

    getBasketProducts(): IProduct[] {
        return [...this.products];
    }

    addBasketProduct(product: IProduct): void {
        this.products.push(product);
        this.events.emit("basket:changed");
    }

    deleteBasketProduct(product: IProduct): void {
        this.products = this.products.filter((item) => item.id !== product.id);
        this.events.emit("basket:changed");
    }

    clearBasket(): void {
        this.products = [];
        this.events.emit("basket:changed");
    }

    getBasketTotal(): number {
        return this.products.reduce((sum, item) =>
            sum + (item.price ?? 0), 0);
    }

    getBasketProductsCount(): number {
        return this.products.length;
    }

    getBasketProductById(id: string): boolean {
        return this.products.some((item) => item.id === id);
    }

}