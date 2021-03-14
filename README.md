# The Carbon Challenge [![Netlify Status](https://api.netlify.com/api/v1/badges/59e1b698-b856-4584-af4d-171d326b44ea/deploy-status)](https://app.netlify.com/sites/carbon-challenge/deploys) ![GitHub Action status](https://github.com/vkoves/carbon-challenge/actions/workflows/tests.yml/badge.svg)

The Carbon challenge interactive simulator/game. Powered by [Vue.js 3][vue].

## Language Support

The Carbon Challenge supports multiple languages using [Vue i18n][vue-i18n]. To
add a new language, add it in `src/constants/languages.ts` and then create a new
language data in `src/locales`, modelled off of an existing one.

We welcome any help adding new languages or fixing translations!

## Project Setup

Just clone, and as long as you have [Yarn][yarn] you can just run:

```
yarn install
```

### Compiles and hot-reloads for development

After setup, run:

```
yarn serve
```

### Compiles and minifies for production

After setup, run:

```
yarn build
```

### Running Tests

We only have unit tests right now. To run them, after setup run:

```
yarn test:unit
```

### Lints and Auto Fixes Files

After setup, run:

```
yarn lint
```

<!-- Link declarations-->
[vue]: https://v3.vuejs.org
[vue-i18n]: https://vue-i18n.intlify.dev/
[yarn]: https://yarnpkg.com
