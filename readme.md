# Инструкция

## Создание главного проекта

Создать `package.json` с текстом:

```json
{
  "name": "nuxt3-strapi-starter",
  "version": "1.0.0",
  "scripts": {
    "develop:backend": "npm run --prefix backend develop",
    "develop:frontend": "wait-on http://localhost:1337/admin && npm run --prefix frontend dev",
    "develop": "cross-env FORCE_COLOR=1 npm-run-all -l -p develop:*"
  },
  "dependencies": {
  }
}
```

Установка зависимостей

- `npm install cross-env`
- `npm install wait-on`
- `npm install npm-run-all`

## Установка Nuxt 3

> Выполняется из директории главного проекта

1. `npx nuxi init frontend`
2. `cd frontend`
3. `npm install`
4. Переименовываем `nuxt.config.ts` в `nuxt.config.js` 

## Установка Strapi

> Выполняется из директории главного проекта

1. `npx create-strapi-app@latest backend --quickstart`
2. После установки заходим в админку и создаем тестовую коллекцию Test
3. Заполняем ее тестовыми данными
4. Даем коллекции Test права на публичное `find`, `findOne`

## Установка модуля NuxtStrapi

> Выполняется из директории проекта frontend

1. `npm install @nuxtjs/strapi --save-dev`
2. В конфигурационный файл Nuxt `nuxt.config.js` добавляются настройки:
```javascript
  export default {  
    modules: ['@nuxtjs/strapi'],  
    strapi: {  
        url: process.env.STRAPI_URL || 'http://127.0.0.1:1337',  
        prefix: '/api',  
        version: 'v4',  
        cookie: {},  
        cookieName: 'strapi_jwt'
    }
}
```

## Проверка извлечения данных Nuxt из Strapi

> Выполняется из директории проекта frontend

Правим `app.vue`, приводим его к следующему виду:

```vue
<template>
  <div>
    <pre>
      {{response}}
    </pre>
  </div>
</template>

<script setup>
  const { find } = useStrapi()
  const response = await find('tests')
</script>
```

На главной появится содержимое коллекции Test

## Подключение ESLint и Prettier к Nuxt

> Выполняется из директории проекта frontend

Устанавливаем необходимые модули

`npm install eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/eslint-config-standard eslint-config-prettier eslint-plugin-prettier eslint-plugin-nuxt eslint-plugin-vue --save-dev`

Создаем файл `.eslintrc.js`

```javascript
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: "@typescript-eslint/parser",
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:nuxt/recommended",
        "plugin:vue/vue3-recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["@typescript-eslint"],
    rules: {
        "vue/script-setup-no-uses-vars": "off",
    },
};
```
Включаем автофиксинг кода при сохранении в WebStorm в настройках проекта (`Ctrl + Alt + S`)

![](./readme-eslint.png)

## Полезные ссылки

https://itnext.io/nuxt-3-first-steps-c23d142405c4
