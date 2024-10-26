/**
 * Copyright © 2024 Cloudnode OÜ
 *
 * This file is part of @cldn/components.
 *
 * \@cldn/components is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * \@cldn/components is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the
 * implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with @cldn/components.
 * If not, see <https://www.gnu.org/licenses/>.
 */
import {NodeComponent} from "./index.js";

/**
 * A {@link !DocumentFragment} component
 */
export class DocumentComponent extends NodeComponent<DocumentFragment> {
    public constructor(html?: string) {
        super(html ? document.createRange().createContextualFragment(html) : document.createDocumentFragment());
    }

    /**
     * Template literal tag function that accepts HTML code with components in a
     * string literal
     */
    public static tag(strings: TemplateStringsArray, ...components: NodeComponent<any>[]): DocumentComponent {
        const idPrefix = `tag-${crypto.randomUUID()}-`;
        const doc = new DocumentComponent(strings.reduce((acc, str, index) => acc += `${str}${index < components.length ? `<slot name="${idPrefix}${index - 1}"></slot>` : ""}`, ""));
        for (const [index, component] of components.entries())
            component.slot(idPrefix + index, doc.node);
        return doc;
    }
}
