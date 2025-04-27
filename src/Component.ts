/**
 * Copyright © 2024–2025 Cloudnode OÜ.
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

type HtmlTagString<T extends HTMLElement> =
    `<${{ [K in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[K] extends T ? K : never }[keyof HTMLElementTagNameMap]}>${string}`
    | `<${{ [K in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[K] extends T ? K : never }[keyof HTMLElementTagNameMap]} ${string}`;

/**
 * An {@link !HTMLElement} component.
 *
 * To create your own HTML component, it's recommended to extend this class.
 * @typeParam T Component element type
 */
export class Component<T extends HTMLElement = HTMLElement> extends ElementComponent<T> {
    /**
     * Create Component instance
     * @param element Instance or tag name
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
    public static from<T extends HTMLElement = HTMLElement>(html: HtmlTagString<T>) {
        return new Component<T>(document.createRange().createContextualFragment(html).children[0] as T);
    }

    /**
     * Get the first component child that matches the specified
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors CSS selector}, or group of CSS selectors.
     * If no matches are found, null is returned.
     *
     * @param selectors
     * @typeParam T Component element type
     */
    public select<T extends HTMLElement = HTMLElement>(...selectors: string[]): Component<T> | null {
        const element = this.node.querySelector<T>(selectors.join(","));
        if (element == null) return null;
        return new Component<T>(element);
    }

    /**
     * Get all child components that match the specified
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors CSS selector}, or group of CSS selectors.
     *
     * @param selectors
     * @typeParam T Component element type
     */
    public selectAll<T extends HTMLElement = HTMLElement>(...selectors: string[]): Component<T>[] {
        return [...this.node.querySelectorAll<T>(selectors.join(","))].map(e => new Component<T>(e));
    }

    /**
     * Traverse the component and its parents (heading toward the document root) until it finds a component that matches
     * the specified {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors CSS selector}.
     * @param selectors
     * @typeParam T Component element type
     */
    public closest<T extends HTMLElement = HTMLElement>(...selectors: string[]): Component<T> | null {
        const element = this.node.closest<T>(selectors.join(","));
        if (element == null) return null;
        return new Component<T>(element);
    }

    /**
     * Test whether the element would be selected by the specified
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors CSS selector}, or group of CSS selectors.
     * @param selectors
     */
    public is(...selectors: string[]): boolean {
        return this.node.matches(selectors.join(","));
    }

    /**
     * Puts the element into
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus focus}.
     * @param options - An optional object for controlling aspects of the focusing process.
     */
    public focus(options?: FocusOptions): typeof this {
        this.node.focus(options);
        return this;
    }

    /**
     * Set style property
     * @param name Property name
     * @param value Property value
     */
    public css(name: string, value: string): typeof this;

    /**
     * Set style property
     * @param name Property name
     * @param value Property value
     * @param priority Whether to make this rule `!important`
     */
    public css(name: string, value: string, priority: boolean): typeof this;

    /**
     * Set style properties
     * @param properties Object of style property name and value pairs
     */
    public css(properties: Record<string, string>): typeof this;

    public css(...args: [string, string] | [string, string, boolean] | [Record<string, string>]): typeof this {
        if (args.length === 2 || args.length === 3) {
            const name: string = args[0];
            const value: string = args[1];
            const priority: boolean = args[2] ?? false;
            this.node.style.setProperty(name, value, priority ? "important" : undefined);
        }
        else {
            const properties: Record<string, string> = args[0];
            for (const [name, value] of Object.entries(properties))
                this.css(name, value);
        }
        return this;
    }

    public override clone(deep = true) {
        return new Component<T>(this.node.cloneNode(deep) as T);
    }

    public override on<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K], component: this) => any): typeof this;
    public override on<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K], component: this) => any, options: AddEventListenerOptions): typeof this;
    public override on<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K], component: this) => any, useCapture: boolean): typeof this;
    public override on<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K], component: this) => any, c?: boolean | AddEventListenerOptions): typeof this {
        return super.on(type as any, listener, c as any);
    }
}
