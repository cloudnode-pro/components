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
	 * Add event listener
	 * @param type
	 * @param listener
	 * @param options
	 */
	public on(type: string, listener: (ev: Event, component: this) => any, options?: boolean | AddEventListenerOptions) {
		this.node.addEventListener(type, e => listener(e, this), options);
		return this;
	}
}
