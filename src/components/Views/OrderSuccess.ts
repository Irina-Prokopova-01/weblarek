import { ISuccess, ISuccessActions } from "../../types";
import {Component} from "../base/Component.ts";
import {ensureElement} from "../../utils/utils.ts";

export class OrderSuccess extends Component<ISuccess> {
    protected successOrderCheck: HTMLElement;
    protected successOrderButton: HTMLButtonElement;
    constructor(container: HTMLElement, actions?: ISuccessActions) {
        super(container);

        this.successOrderCheck = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.successOrderButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        if (actions?.onClose) {
            this.successOrderButton.addEventListener("click", actions.onClose);
        }
    }
    set description(value: string) {
        this.successOrderCheck.textContent = value;
    }
}