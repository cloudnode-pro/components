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

/**
 * Non-readonly non-method keys
 */
type WritableKeys<T> = Extract<
    {
        [Prop in keyof T]: (
        (<G>() => G extends Pick<T, Prop> ? 1 : 2) extends
            (<G>() => G extends Record<Prop, T[Prop]> ? 1 : 2)
            ? true
            : false
        ) extends false
        ? never
        : Prop;
    }[keyof T],
    {
        [K in keyof T]: T[K] extends Function ? never : K;
    }[keyof T]
>;


/**
 * An {@link !Element} component
 * @typeParam T Component element type
 */
export abstract class BaseComponent<T extends Element> {
    /**
     * This component's element
     */
    public readonly element: T;

    /**
     * @param element Initial element for this component
     * @protected
     */
    protected constructor(element: T) {
        this.element = element;
    }

    /**
     * Insert component after the last child
     */
    public append(...components: BaseComponent<any>[]) {
        components.forEach((component) => this.element.appendChild(component.element))
        return this;
    }

    /**
     * Insert component before the first child
     */
    public prepend(...components: BaseComponent<any>[]) {
        components.forEach((component) => this.element.prepend(component.element))
        return this;
    }

    /**
     * Add classes
     */
    public class(...classes: string[]) {
        this.element.classList.add(...classes.flatMap(c => c.split(" ")));
        return this;
    }

    /**
     * Remove classes
     */
    public removeClass(...classes: string[]) {
        this.element.classList.remove(...classes.flatMap(c => c.split(" ")));
        return this;
    }

    /**
     * Toggle classes
     */
    public toggleClass(...classes: string[]) {
        for (const c of new Set(classes.flatMap(c => c.split(" "))))
            this.element.classList.toggle(c);
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
        return classes.every(c => this.element.classList.contains(c));
    }

    /**
     * Set attribute
     * @param name attribute name
     * @param [value] attribute value
     */
    public attr(name: string, value?: string) {
        this.element.setAttribute(name, value ?? "");
        return this;
    }

    /**
     * Remove attribute
     * @param name attribute name
     */
    public removeAttr(name: string) {
        this.element.removeAttribute(name);
        return this;
    }

    /**
     * Set text content
     */
    public text(text: string) {
        this.element.textContent = text;
        return this;
    }

    /**
     * Set inner HTML
     */
    public html(html: string) {
        this.element.innerHTML = html;
        return this;
    }

    /**
     * Set element property
     * @param name property name
     * @param value property value
     */
    public set<K extends WritableKeys<T>>(name: K, value: T[K]) {
        this.element[name] = value;
        return this;
    }

    /**
     * Get element property
     * @param name property name
     */
    public get<K extends WritableKeys<T>>(name: K): T[K] {
        return this.element[name];
    }

    /**
     * Remove the element
     */
    public remove(): this {
        this.element.remove();
        return this;
    }

    /**
     * Add event listener
     * @param type
     * @param listener
     * @param options
     */
    public on<K extends keyof ElementEventMap>(type: K, listener: (ev: ElementEventMap[K], component: this) => any, options?: boolean | AddEventListenerOptions) {
        this.element.addEventListener(type, e => listener(e, this), options);
        return this;
    }

    /**
     * Get this component's outer HTML
     */
    public toString() {
        return this.element.outerHTML;
    }
}
