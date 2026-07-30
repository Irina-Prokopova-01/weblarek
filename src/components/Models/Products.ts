import { IProduct } from "../../types"
import { IEvents } from "../base/Events.ts";

export class Products {
    private products: IProduct[] = [];
    private selectProduct: IProduct | null = null;

    constructor(private events: IEvents) {}
    saveProducts(products: IProduct[]): void {
        this.products = [...products];
        this.events.emit("products:changed");
    }

    getProducts(): IProduct [] {
        return [...this.products];
    }


    getProductById(id:string): IProduct | undefined {
        return  this.products.find(product => product.id === id);
    }

    saveSelectProduct(product: IProduct): void {
        this.selectProduct = product;
    }

    getSelectProduct(): IProduct | null {
        return this.selectProduct;
    }
}