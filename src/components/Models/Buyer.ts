import {IBuyer, ValidationErrors} from "../../types"
import { TPayment } from "../../types"
import { IEvents } from "../base/Events";

export  class Buyer {
    private payment: TPayment | "" = "";
    private address: string = "";
    private email: string = "";
    private phone: string = "";

    constructor(private events: IEvents) {}

    saveBuyerAddress(address: string): void {
        this.address = address;
        this.events.emit("buyer:changed");
    }

    saveBuyerEmail(email: string): void {
        this.email = email;
        this.events.emit("buyer:changed");
    }

    saveBuyerPhone(phone: string): void {
        this.phone = phone;
        this.events.emit("buyer:changed");
    }

    saveBuyerPayment(payment: TPayment): void {
        this.payment = payment;
        this.events.emit("buyer:changed");
    }

    getBuyerData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone,
        }
    }

    clearBuyer(): void {
        this.phone = "";
        this.address = "";
        this.email = "";
        this.payment = "";

        this.events.emit("buyer:changed");
    }


    validateBuyer(): ValidationErrors {
        const errors: ValidationErrors = {};

        if (!this.payment) {
            errors.payment = "Выберите способ оплаты";
        }

        if (!this.email) {
            errors.email = "Укажите email";
        }

        if (!this.phone) {
            errors.phone = "Укажите телефон";
        }

        if (!this.address) {
            errors.address = "Укажите адрес";
        }

        return errors;
    }
}