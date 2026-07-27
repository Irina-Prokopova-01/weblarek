import { ISuccess } from "../../types";
import {Component} from "../base/Component.ts";
import {ensureElement} from "../../utils/utils.ts";
import {IEvents} from "../base/Events.ts";

export class orderSuccess extends Component<ISuccess> {
    protected successOrderChekc: HTMLElement;
    protected successOrderButton: HTMLButtonElement;
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.successOrderChekc = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.successOrderButton = ensureElement<HTMLButtonElement>('.button order-success__close', this.container);

        this.successOrderButton.addEventListener('click', () => {
            this.events.emit('success-modal:close');

        })
    }
    set check(value: number) {
        this.successOrderChekc.textContent = `Списано ${value} синапсов`;
    }
}