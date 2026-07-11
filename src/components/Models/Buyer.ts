import {IBuyer, ValidationErrors} from "../../types"
import { TPayment } from "../../types"

export  class Buyer {
    private payment: TPayment = "";
    private address: string = "";
    private email: string = "";
    private phone: string = "";

    getBuyerData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone,
        }
    }

    saveBuyerAddress(address: string): void {
        this.address = address;
    }

    saveBuyerEmail(email: string): void {
        this.email = email;
    }

    saveBuyerPhone(phone: string): void {
        this.phone = phone;
    }

    saveBuyerPayment(payment: TPayment): void {
        this.payment = payment;
    }

    clearBuyer(): void {
        this.phone = "";
        this.address = "";
        this.email = "";
        this.payment = "";
    }

    validateBuyer(): ValidationErrors {
        const errors: ValidationErrors = {};

        if (!this.phone || this.phone.trim() === "") {
            errors.phone = "Укажите номер телефона";
        }
        if (!this.email || this.email.trim() === "") {
            errors.email = "Укажите электронный адрес";
        }
        if (!this.address || this.address.trim() === "") {
            errors.address = "Укажите почтовый адрес"
        }
        if (!this.payment || this.payment.trim() === "") {
            errors.payment = "Не выбран вид оплаты"
        }

        return  errors ;
    }

}