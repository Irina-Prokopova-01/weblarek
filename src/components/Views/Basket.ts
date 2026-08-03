import { IBasket, IBasketActions } from "../../types";
import {ensureElement} from "../../utils/utils.ts";
import {Component} from "../base/Component.ts";

export class BasketViews extends Component<IBasket> {
     protected basketButtonOrder: HTMLButtonElement;
     protected basketPrice: HTMLElement;
     protected basketList: HTMLElement;

     constructor(container: HTMLElement, actions?: IBasketActions) {
         super(container);

         this.basketButtonOrder = ensureElement<HTMLButtonElement>('.basket__button', this.container);
         this.basketPrice = ensureElement<HTMLElement>('.modal__title', this.container);
         this.basketList = ensureElement<HTMLElement>('.basket__price', this.container);
         this.basketButtonOrder.addEventListener('click', () => {
             actions?.onOrder()
         })
     }

     set buttonDisabled(value: boolean) {
         this.basketButtonOrder.disabled = value;
     }

     set price(value: string) {
         this.basketPrice.textContent = `${value} синапсов`;
     }

     set items(values: HTMLElement[]) {
         this.basketList.replaceChildren(...values);
     }
}