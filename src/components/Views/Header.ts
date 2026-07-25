import { IHeader } from "../../types";
import {Component} from "../base/Component.ts";
import {IEvents} from "../base/Events.ts";
import {ensureElement} from "../../utils/utils.ts";


export class Header extends Component<IHeader>{
    protected counterElement: HTMLElement;
    protected basketButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });

    }
    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}