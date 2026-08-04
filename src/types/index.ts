import {categoryMap} from "../utils/constants.ts";

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

export interface IHeader {
    counter: number;
}

export interface IGallery {
    catalog: HTMLElement [];
}

export interface IModal {
    content: HTMLElement;
}

export interface ISuccess {
    description: number;
}

export interface ICard {
    title: string;
    price: number | null;
}

export type CategoryKey = keyof typeof categoryMap;

export interface ICardActions {
    onClick: () => void;
}

export interface ICardPreviewActions {
    onToggle: () => void;
}

export type TCardPreview = Pick<IProduct, "image" | "category" | "description">;

export type TCardBasket = Pick<IProduct, "id"> & {
    index: number;
};

export interface ICardBasketActions {
    onDelete: () => void;
}

export interface IBasket {
    items: HTMLElement[];
    price: string;
    buttonDisabled: boolean;
}

export interface IBasketActions {
    onOrder: () => void;
}

export interface IBaseForm {
    valid: boolean;
    error: string;
}

export interface IBaseFormActions {
    onSubmit: () => void;
}

export interface IContactFormActions {
    onSubmit: () => void;
    onEmail: (value: string) => void;
    onPhone: (value: string) => void;
}
//
// export interface IContactForm {
//     email: string;
//     phone: string;
// }

export interface IOrderFormActions {
    onPayment: (value: string) => void;
    onAddress: (value: string) => void;
    onSubmit: () => void;
}