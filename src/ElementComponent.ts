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
import {DocumentComponent, NodeComponent} from "./index.js";

/**
 * Non-readonly non-method keys
 */
type WritableKeys<T> = {
    [Prop in keyof T]: (
        (<G>() => G extends Pick<T, Prop> ? 1 : 2) extends (
            <G>() => G extends Record<Prop, T[Prop]> ? 1 : 2
            ) ? true : false
        ) extends false
        ? never
        : (T[Prop] extends Function | null | undefined ? never : Prop);
}[keyof T];

/**
 * Non-method keys
 */
type ReadableKeys<T> = {
    [Prop in keyof T]: T[Prop] extends Function | null | undefined ? never : Prop;
}[keyof T];


/**
 * An {@link !Element} component
 * @typeParam T Component element type
 */
export abstract class ElementComponent<T extends Element> extends NodeComponent<T> {
    /**
     * @param element Initial element for this component
     * @protected
     */
    protected constructor(element: T) {
        super(element);
    }

    /**
     * Insert component before the first child
     */
    public prepend(...components: NodeComponent<any>[]) {
        components.forEach((component) => this.node.prepend(component.node))
        return this;
    }

    /**
     * Add classes
     */
    public class(...classes: string[]) {
        this.node.classList.add(...classes.flatMap(c => c.split(" ")));
        return this;
    }

    /**
     * Remove classes
     */
    public removeClass(...classes: string[]) {
        this.node.classList.remove(...classes.flatMap(c => c.split(" ")));
        return this;
    }

    /**
     * Toggle classes
     */
    public toggleClass(...classes: string[]) {
        for (const c of new Set(classes.flatMap(c => c.split(" "))))
            this.node.classList.toggle(c);
        return this;
    }

    /**
     * Replace classes
     *
     * @param oldClasses If all of these classes are present, they will be removed.
     * @param newClasses The classes to add if all {@link oldClasses} are present
     */
    public replaceClass(oldClasses: string | string[], newClasses: string | string[]) {
        const remove = (typeof oldClasses === "string" ? [oldClasses] : oldClasses).flatMap(c => c.split(" "));
        const add = (typeof newClasses === "string" ? [newClasses] : newClasses).flatMap(c => c.split(" "));
        if (this.hasClass(...remove)) {
            this.removeClass(...remove);
            this.class(...add);
        }
        return this;
    }

    /**
     * Check if component has class
     * @returns true if component has all the specified classes
     */
    public hasClass(...classes: string[]) {
        return classes.every(c => this.node.classList.contains(c));
    }

    /**
     * Set attribute
     * @param name attribute name
     * @param [value] attribute value
     */
    public attr(name: string, value?: string) {
        this.node.setAttribute(name, value ?? "");
        return this;
    }

    /**
     * Remove attribute
     * @param name attribute name
     */
    public removeAttr(name: string) {
        this.node.removeAttribute(name);
        return this;
    }

    /**
     * Append HTML.
     *
     * Any components (provided as `${...}` inside the HTML string literal)
     * remain fully functional and are appended (not just as HTML).
     * @example
     * component.html`<div>${new Component("button")
     *      .text("Click me")
     *      .on("click", () => console.log("clicked"))
     * }</div>`
     * // Event listeners etc. are preserved.
     * // Note the lack of parentheses.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals Template literals (Template strings) - MDN
     */
    public html(strings: TemplateStringsArray, ...components: NodeComponent<any>[]): this {
        return this.append(DocumentComponent.tag(strings, ...components));
    }

    /**
     * Set element property
     * @param name property name
     * @param value property value
     */
    public set<K extends WritableKeys<T>>(name: K, value: T[K]) {
        this.node[name] = value;
        return this;
    }

    /**
     * Get element property
     * @param name property name
     */
    public get<K extends ReadableKeys<T>>(name: K): T[K] {
        return this.node[name];
    }

    /**
     * Remove the element
     */
    public remove(): this {
        this.node.remove();
        return this;
    }

    public override on<K extends keyof ElementEventMap>(type: K, listener: (ev: ElementEventMap[K], component: this) => any): typeof this;
    public override on<K extends keyof ElementEventMap>(type: K, listener: (ev: ElementEventMap[K], component: this) => any, options: AddEventListenerOptions): typeof this;
    public override on<K extends keyof ElementEventMap>(type: K, listener: (ev: ElementEventMap[K], component: this) => any, useCapture: boolean): typeof this;
    public override on<K extends keyof ElementEventMap>(type: K, listener: (ev: ElementEventMap[K], component: this) => any, c?: boolean | AddEventListenerOptions): typeof this {
        return super.on(type as any, listener, c as any);
    }

    /**
     * Get this component's outer HTML
     */
    public override toString() {
        return this.node.outerHTML;
    }
}
