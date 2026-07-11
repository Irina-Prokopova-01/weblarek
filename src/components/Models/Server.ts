import { IApi, IProductsResponse, IOrderResult, IOrderInfo } from "../../types";


export class Server {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    };

    async getProduct(): Promise<IProductsResponse> {
        return await this.api.get<IProductsResponse>('/product/')
    };

    async postOrder(orderInfo: IOrderInfo): Promise<IOrderResult> {
        return await this.api.post('/order/', orderInfo)
    };
}
