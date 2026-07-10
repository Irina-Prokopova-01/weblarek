import { IProduct } from "../../types"

export class Products {
    private products: IProduct[] = [];
    private selectProduct: IProduct | null = null;

    getProducts(): IProduct [] {
        return [...this.products];
    }

    saveProducts(products: IProduct[]): void {
        this.products = [...products];
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