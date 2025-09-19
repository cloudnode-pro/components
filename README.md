# @cldn/components

[![Documentation](https://img.shields.io/badge/Documentation-blue)](https://components.cldn.pro/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github)](https://github.com/cloudnode-pro/components)
[![NPM](https://img.shields.io/npm/v/@cldn/components.svg)](https://www.npmjs.com/package/@cldn/components)
[![Downloads](https://img.shields.io/npm/d18m/@cldn/components.svg)](https://www.npmjs.com/package/@cldn/components)
[![Licence](https://img.shields.io/github/license/cloudnode-pro/components)](https://github.com/cloudnode-pro/components/blob/main/LICENSE)
[![CI](https://github.com/cloudnode-pro/components/actions/workflows/ci.yml/badge.svg)](https://github.com/cloudnode-pro/components/actions/workflows/ci.yml)

Base classes for creating web components.

This library is intended for use in a web browser environment. A bundler, such as [Webpack](https://webpack.js.org/)
or [Vite](https://vitejs.dev/) is recommended.

[**Documentation**](https://components.cldn.pro)

## Installation

```shell
npm i @cldn/components
```

## Usage

To create your own components, it's recommended to extend one of the classes provided in this library.

For example:

```ts
import {Component} from "@cldn/components";

class ButtonComponent extends Component<HTMLButtonElement> {
    public constructor(text: string) {
        super("button");
        this.text(text)
            .class("bg-blue-500", "px-4", "…");
    }
}
```

## Licence

Copyright © 2024–2025 Cloudnode OÜ.

This file is part of @cldn/components.

@cldn/components is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General
Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any
later version.

@cldn/components is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
details.

You should have received a copy of the GNU Lesser General Public License along with @cldn/components. If not,
see https://www.gnu.org/licenses/.
