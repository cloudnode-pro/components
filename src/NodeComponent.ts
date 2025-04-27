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

/**
 * A {@link !Node} component
 * @typeParam T Node type
 */
export abstract class NodeComponent<T extends Node> {
	/**
	 * This component's node
	 */
	public readonly node: T;

	/**
	 * @param node Initial node for this component
	 * @protected
	 */
	protected constructor(node: T) {
		this.node = node;
	}

	/**
	 * Run a function in the context of this component
	 * @param fn Provides this component as the first argument and `this`.
	 */
	public context(fn: (this: this, component: this) => any): this {
		fn.call(this, this);
		return this;
	}

	/**
	 * Insert component after the last child
	 */
	public append(...components: NodeComponent<any>[]) {
		components.forEach((component) => this.node.appendChild(component.node))
		return this;
	}

	/**
	 * Set text content
	 */
	public text(text: string) {
		this.node.textContent = text;
		return this;
	}

	/**
	 * Clone this component. Event listeners are not cloned.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode Node: cloneNode() - MDN}
	 * @param [deep] Whether to clone the whole subtree.
	 * @returns A duplicate of this component.
	 */
	public abstract clone(deep?: boolean): NodeComponent<T>;

	/**
	 * Add event listener
	 * @param type A case-sensitive string representing the event type to listen for.
	 * @param listener The function that is called when an event of the specified type occurs.
	 */
	public on(type: string, listener: (ev: Event, component: this) => any): typeof this;
	/**
	 * Add event listener
	 * @param type A case-sensitive string representing the event type to listen for.
	 * @param listener The function that is called when an event of the specified type occurs.
	 * @param options An object that specifies characteristics about the event listener. See {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options `options` on MDN}
	 */
	public on(type: string, listener: (ev: Event, component: this) => any, options: AddEventListenerOptions): typeof this;
    /**
     * Add event listener
     * @param type A case-sensitive string representing the event type to listen for.
     * @param listener The function that is called when an event of the specified type occurs.
     * @param useCapture See {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#usecapture `useCapture` on MDN}
     */
    public on(type: string, listener: (ev: Event, component: this) => any, useCapture: boolean): typeof this;
    public on(type: string, listener: (ev: Event, component: this) => any, c?: boolean | AddEventListenerOptions) {
        this.node.addEventListener(type, e => listener(e, this), c);
        return this;
    }

	/**
	 * Render this component in the place of a `<slot name="…"></slot>`.
	 * @throws {@link !DOMException} When the slot is not found
	 * @param slot The slot name
	 * @param [parent] The parent element within to search for slots. Defaults to `document`
	 */
	public slot(slot: string, parent: ParentNode = document) {
		const slotNode = parent.querySelector(`slot[name="${slot}"]`);
		if (slotNode === null) throw new DOMException(`Could not find slot "${slot}"`);
		slotNode.replaceWith(this.node);
		return this;
	}

	/**
	 * Empty the component (remove children)
	 */
	public empty() {
		while (this.node.firstChild)
			this.node.removeChild(this.node.firstChild);
		return this;
	}
}
