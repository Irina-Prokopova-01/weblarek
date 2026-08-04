import { ISuccess } from "../../types";
import {Component} from "../base/Component.ts";
import {ensureElement} from "../../utils/utils.ts";
import {IEvents} from "../base/Events.ts";

export class OrderSuccess extends Component<ISuccess> {
    protected successOrderCheck: HTMLElement;
    protected successOrderButton: HTMLButtonElement;
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.successOrderCheck = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.successOrderButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.successOrderButton.addEventListener('click', () => {
            this.events.emit('success-modal:close');

        })
    }
    set description(value: string) {
        this.successOrderCheck.textContent = `Списано ${value} синапсов`;
    }
}