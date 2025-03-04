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
    public static tag(strings: TemplateStringsArray, ...components: (any | NodeComponent<any>)[]): DocumentComponent {
        const idPrefix = `tag-${crypto.randomUUID()}-`;
        const nodes: NodeComponent<any>[] = [];
        const doc = new DocumentComponent(strings.reduce((acc, str, index) => {
            if (index >= components.length) return acc + str;
            const component = components[index];
            if (component instanceof NodeComponent) {
                nodes.push(component);
                return `${acc}${str}<slot name="${idPrefix}${nodes.length - 1}"></slot>`;
            }
            return acc + str + String(component);
        }, ""));
        for (const [index, component] of nodes.entries())
            component.slot(idPrefix + index, doc.node);
        return doc;
    }

    public override clone(deep = true) {
        const doc = new DocumentComponent();
        doc.node.append(this.node.cloneNode(deep));
        return doc;
    }
}
