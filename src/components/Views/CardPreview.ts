import {CategoryKey, ICardPreviewActions, TCardPreview} from "../../types";
import {Card} from "./Card.ts";
import {ensureElement} from "../../utils/utils.ts";
import {categoryMap} from "../../utils/constants.ts";
import {CDN_URL} from "../../utils/constants.ts";


export class CardPreview extends Card<TCardPreview> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, action?:ICardPreviewActions ) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>( "card__image", this.container);
        this.categoryElement = ensureElement<HTMLElement>( "card__category", this.container);
        this.descriptionElement = ensureElement<HTMLElement>('card__text', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>( "button card__button", this.container);

        if (action?.onToggle) {
            this.buttonElement.addEventListener("click", action.onToggle);
        }
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as CategoryKey],
                key === value,
            );
        }
    }

    set img (value: string) {
        this.setImage(this.imageElement, CDN_URL + value, this.title);
    }
}