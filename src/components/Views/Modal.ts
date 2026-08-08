import { IModal } from "../../types";
import {Component} from "../base/Component.ts";
import {ensureElement} from "../../utils/utils.ts";


export class Modal extends Component<IModal> {
    protected contentModal: HTMLElement;
    protected closeModal: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);

        this.contentModal = ensureElement<HTMLElement>('.modal__content', this.container);
        this.closeModal = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.closeModal.addEventListener("click", () => {
            this.close();
        });

    }
    set content(value: HTMLElement) {
        this.contentModal.replaceChildren();
        this.contentModal.append(value);
    }
    open() {
        this.container.classList.add("modal_active");
    }

    close() {
        this.container.classList.remove("modal_active");
    }
}