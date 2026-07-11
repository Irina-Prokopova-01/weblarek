import { IProduct } from "../../types";

export  class Basket{
    private products: IProduct[] = [];

    getBasketProducts(): IProduct[] {
        return [...this.products];
    }

    addBasketProduct(product: IProduct): void {
        this.products.push(product);
    }

    deleteBasketProduct(product: IProduct): void {
        this.products = this.products.filter((item) => item.id !== product.id);
    }

    clearBasket(): void {
        this.products = [];
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