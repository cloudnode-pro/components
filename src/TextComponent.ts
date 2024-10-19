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
import {NodeComponent} from "./NodeComponent.js";

/**
 * A text node component
 */
export class TextComponent extends NodeComponent<Text> {
	/**
	 * Create component
	 * @param text Text node instance or text content string
	 */
	public constructor(text: Text | string) {
		super(typeof text === "string" ? document.createTextNode(text) : text);
	}

	/**
	 * @deprecated Cannot add children to a TextComponent
	 *
	 * @throws {@link !DOMException} Always
	 */
	public override append(): never {
		throw new DOMException(`NodeComponent.append: Cannot add children to a ${this.constructor.name}`);
	}

	/**
	 * Get the text content
	 */
	public override toString() {
		return this.node.textContent;
	}
}
