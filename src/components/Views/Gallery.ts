import {IGallery} from "../../types";
import {Component} from "../base/Component.ts";


export class Gallery extends Component<IGallery> {
    protected catalogElement: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);

        this.catalogElement = this.container
    }
    set catalog(items: HTMLElement[]) {
        this.catalogElement.replaceChildren();
        items.forEach(item => {
            this.catalogElement.append(item);
        })
    }

}