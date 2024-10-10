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
import {BaseComponent} from "./index.js";

/**
 * An SVG component (`<svg>`)
 */
export class SvgComponent extends BaseComponent<SVGSVGElement> {
    public constructor(element?: SVGSVGElement) {
        super(element ?? document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    }

    /**
     * Create SVG component from `<svg>...</svg>` code
     */
    public static from(svg: string) {
        return new SvgComponent(document.createRange().createContextualFragment(svg).children[0] as SVGSVGElement);
    }
}
