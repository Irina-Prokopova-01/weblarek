import {BaseForm} from "./BaseForm.ts";
import {IOrderFormActions, TPayment} from "../../types";
import {ensureElement} from "../../utils/utils.ts";


export class OrderForm extends BaseForm {
    protected cardOrderButton: HTMLButtonElement;
    protected cashOrderButton: HTMLButtonElement;
    protected addressOrderInput: HTMLInputElement;

    constructor(container: HTMLElement, actions?: IOrderFormActions) {
        super(container, actions);

        this.cardOrderButton = ensureElement<HTMLButtonElement>('[name="card"]', this.container);
        this.cashOrderButton= ensureElement<HTMLButtonElement>('[name="cash"]', this.container);
        this.addressOrderInput = ensureElement<HTMLInputElement>('[name="address"]', this.container);

        this.addressOrderInput.addEventListener("input", () => {
            actions?.onAddress(this.addressOrderInput.value);
        })

        this.cardOrderButton.addEventListener("click", () => {
            actions?.onPayment("card");
        })
        this.cashOrderButton.addEventListener("click", () => {
            actions?.onPayment("cash");
        })
    }

    set payment(value: TPayment | "") {
        this.cardOrderButton.classList.toggle("button_alt-active", value === "card");
        this.cashOrderButton.classList.toggle("button_alt-active", value === "cash");
    }

    set address(value: string) {
        this.addressOrderInput.value = value;
    }
}