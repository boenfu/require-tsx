# require-tsx

direct require `.tsx` in Node.js

[![npm version](https://img.shields.io/npm/v/require-tsx.svg)](https://www.npmjs.com/package/require-tsx)
[![Install Size](https://packagephobia.now.sh/badge?p=require-tsx)](https://packagephobia.now.sh/result?p=require-tsx)
[![MIT License](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](LICENSE)

## Usage

Installation:

```bash
yarn add require-tsx # Or npm install --save require-tsx
```

```js
// require in main file
require('require-tsx');
```

## Examples

### Basic

- index.js

```js
require('require-tsx');
require('./foo').test();
```

- foo.tsx

```tsx
export function test() {
  return <div>Are you OK?</div>;
}
```

### Custom Inject

```js
require('require-tsx').inject({
  '.txt': (content, fileName) => content.replace('foo', 'bar'),
});
```

more see [source code](https://github.com/boenfu/require-tsx/blob/main/src/library/index.ts)

## Motivation

I want render React components to DOM string by direct require.

You should think carefully before using this repo in production.
No usability and compatibility tests.

## License

MIT License.
