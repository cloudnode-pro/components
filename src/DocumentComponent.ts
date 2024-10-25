import {NodeComponent} from "./NodeComponent.js";

/**
 * A {@link !DocumentFragment} component
 */
export class DocumentComponent extends NodeComponent<DocumentFragment> {
    public constructor(html?: string) {
        super(html ? document.createRange().createContextualFragment(html) : document.createDocumentFragment());
    }
}
