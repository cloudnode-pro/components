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
import {ElementComponent} from "./index.js";

type ElementToTagName<T extends HTMLElement> = {
    [K in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[K] extends T ? K : never
}[keyof HTMLElementTagNameMap];

export class Component<T extends HTMLElement = HTMLElement> extends ElementComponent<T> {
    /**
     * @param element Instance or tag name
     * @protected
     */
    public constructor(element: T | ElementToTagName<T>) {
        if (typeof element === "string") {
            const e = document.createElement(element) as any as T;
            super(e);
        }
        else super(element);
    }

    /**
     * Create component from HTML code.
     *
     * Note: only the first child of the HTML code will be used.
     */
    public static from<T extends HTMLElement = HTMLElement>(html: `<${ElementToTagName<T>}${">" | " "}${string}`) {
        return new Component<T>(document.createRange().createContextualFragment(html).children[0] as T);
    }

    public override on<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K], component: this) => any, options?: boolean | AddEventListenerOptions): this {
        return super.on(type as any, listener, options);
    }
}
