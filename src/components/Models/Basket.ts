import { IProduct } from "../../types";
import { IEvents } from "../base/Events.ts";

export  class Basket{
    private products: IProduct[] = [];

    constructor(private events: IEvents) {}

    getBasketProducts(): IProduct[] {
        return [...this.products];
    }

    addBasketProduct(product: IProduct): void {
        // Проверка на существование продукта и его id
        if (!product || !product.id) {
            console.error('Ошибка добавления: продукт не существует или не имеет id', product);
            return;
        }

        // Проверяем, что продукт еще не в корзине
        if (this.getBasketProductById(product.id)) {
            console.warn('Продукт уже в корзине:', product.id);
            return;
        }

        this.products.push(product);
        this.events.emit("basket:changed");
    }

    deleteBasketProduct(product: IProduct): void {
        // Проверка на существование продукта и его id
        if (!product || !product.id) {
            console.error('Ошибка удаления: продукт не существует или не имеет id', product);
            return;
        }

        // Фильтруем продукты, проверяя что каждый item существует и имеет id
        this.products = this.products.filter((item) => {
            // Проверяем, что item существует и имеет id
            if (!item || !item.id) {
                console.warn('Найден некорректный продукт в корзине', item);
                return false; // Удаляем некорректный продукт из корзины
            }
            // Сравниваем id
            return item.id !== product.id;
        });

        // Эмитим событие об изменении корзины
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