export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash' | '';

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export type ValidationErrors = Partial<Record<keyof IBuyer, string>>;

// type ValidationErrors = {
//     payment?: string;
//     address?: string;
//     email?: string;
//     phone?: string;
// };

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderInfo extends IBuyer {
    total: number;
    items: string[];
}