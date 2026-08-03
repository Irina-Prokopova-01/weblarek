import {IBaseFormActions, IBaseForm} from "../../types";
import {Component} from "../base/Component.ts";
import {ensureElement} from "../../utils/utils.ts";


export class BaseForm extends Component<IBaseForm> {
    submitFormButton: HTMLButtonElement;
    errorFormElement: HTMLElement;

    constructor(container: HTMLElement, actions?: IBaseFormActions) {
        super(container);

        this.submitFormButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this.errorFormElement = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            actions?.onSubmit();
        });
    }

    set valid (value: boolean) {
        this.submitFormButton.disabled = !value;
    }

    set error (value: string) {
        this.errorFormElement.textContent = value;
    }
}