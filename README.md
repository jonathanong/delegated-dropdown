# Delegated Dropdown

Mobile-first delegated dropdown menus with smart positioning.

- Handles tap events
- Opens the dropdowns either up or down
- Justifies the content either to the left or the right of the parent
- `esc` closes all dropdowns
- Only one dropdown menu open at a time

Caveats:

- You may need to set `overflow: hidden`
- You need to handle `:hover` states yourself

## API

View [index.css](https://github.com/jonathanong/delegated-dropdown/blob/master/lib/index.css) for the HTML structure.

```js
var dropdown = require('delegated-dropdown')
```

Note that these methods are completely optional.

### dropdown.position(el)

Positions a `.Dropdown` element.

If you do not position your dropdowns, you probably want to set `overflow: hidden` to prevent any accidental scroll bars.

### dropdown.open(el)

### dropdown.close(el)

### dropdown.clear()

Clears all dropdown menus.

## License

The MIT License (MIT)

Copyright (c) 2014 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.