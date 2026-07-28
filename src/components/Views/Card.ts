import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { ICard } from "../../types"

export class Card<T> extends Component<T & ICard> {
    protected cardTitleElement: HTMLElement;
    protected cardPriceElement: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);

        this.cardTitleElement = ensureElement<HTMLElement>(
            ".card__title",
            this.container,
        );
        this.cardPriceElement = ensureElement<HTMLElement>(
            ".card__price",
            this.container,
        );
    }
    set title(value: string) {
        this.cardTitleElement.textContent = value;
    }
    set price(value: number | null) {
        this.cardPriceElement.textContent =
            value === null ? "Бесценно" : `${value} синапсов`;
    }
}