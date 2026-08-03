import {Card} from "./Card.ts";
import { ICardBasketActions, TCardBasket } from "../../types";
import {ensureElement} from "../../utils/utils.ts";


export class CardBasket extends Card<TCardBasket> {
    protected cardBasketDelete: HTMLButtonElement;
    cardBasketIndex: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardBasketActions) {
        super(container);

        this.cardBasketDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        this.cardBasketIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);

        if (actions?.onDelete) {
            this.cardBasketDelete.addEventListener('click', actions.onDelete)
        }
    }

    set index(value: string) {
        this.cardBasketIndex.textContent = value;
    }
}
