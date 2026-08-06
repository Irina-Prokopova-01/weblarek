import {BaseForm} from "./BaseForm.ts";
import { IContactFormActions} from "../../types";
import {ensureElement} from "../../utils/utils.ts";


export class ContactForm extends BaseForm {
    protected emailInputContactForm: HTMLInputElement;
    protected phoneInputContactForm: HTMLInputElement;

    constructor(container: HTMLElement, actions?: IContactFormActions) {
        super(container, actions);
        this.emailInputContactForm = ensureElement<HTMLInputElement>('[name="email"]', this.container);
        this.phoneInputContactForm = ensureElement<HTMLInputElement>('[name="phone"]', this.container);

        this.phoneInputContactForm.addEventListener('input', () => {
            actions?.onPhone(this.phoneInputContactForm.value)
        })

        this.emailInputContactForm.addEventListener('input', () => {
            actions?.onEmail(this.emailInputContactForm.value)

        })
    }

    set email (value: string) {
        this.emailInputContactForm.value = value;
    }

    set phone (value: string) {
        this.phoneInputContactForm.value = value;
    }

}