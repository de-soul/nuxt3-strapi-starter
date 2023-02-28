![](./readme.png)

> Проект представляет из себя стартовый набор для разворачивания full-stack приложения на базе фронтенда: Nuxt 3 + Vuetify 3 и бэкенда Strapi 4. Фронтент и бекенд можно запускать по отдельности или вместе, используя оберточный проект, расположенный в корне. 

# В проекте реализованы
- Шаблонизатор Nuxt 3 (`/layout`, `/pages`)
- Хранилище Pinia (`/stores`)
- Функции переиспользования кода (`/composables`)
- Компоненты (`/components`)
- Промежуточное ПО (`/middleware`)
- Модули (`@nuxtjs/strapi`, `@pinia/nuxt`, `@nuxt/devtools`)
- Headless CMS (`StrapiJS`)

# Быстрый старт

1. Склонируйте репозиторий
2. Установите зависимости командой `npm install` в директориях проектов: `./`, `./backend/`, `./frontend`
3. Запустите full-stack приложение `npm run develop`

# Инструкция

> Вы можете повторить создание проектов самостоятельно. Данная инструкция позволит выполнить все шаги для реализации данного full-stack приложения.

## Создание главного проекта

Создать `package.json` с текстом:

```json
{
  "name": "nuxt3-strapi-starter",
  "version": "1.0.0",
  "scripts": {
    "develop:backend": "npm run --prefix backend develop",
    "develop:frontend": "wait-on http://localhost:1337/admin && npm run --prefix frontend dev",
    "develop": "cross-env FORCE_COLOR=1 npm-run-all -l -p develop:*",
    "production:backend": "npm run --prefix backend start",
    "production:frontend": "wait-on http://localhost:1337/admin && npm run --prefix frontend build && npm run --prefix frontend preview",
    "production": "cross-env FORCE_COLOR=1 npm-run-all -l -p production:*",
    "lint": "eslint --ext .js,.ts --ignore-path .eslintignore ."
  }
}
```

Установка зависимостей

- `npm install cross-env`
- `npm install wait-on`
- `npm install npm-run-all`

## Установка Nuxt 3

> Выполняется из директории главного проекта

1. `npx nuxi find frontend`
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
  strapi: {
    url: process.env.STRAPI_URL || "http://127.0.0.1:1337",
        prefix: "/api",
        version: "v4",
        cookieName: "strapi_jwt",
        key: "authToken",
        cookie: {
        maxAge: 7 * 24 * 3600 * 1000,
            sameSite: "lax",
            secure: true,
            path: "/",
            httpOnly: false,
    },
},
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
        "vue/multi-word-component-names": "off",
        "no-unused-vars": "warn",
        "space-in-parens": "off",
        "computed-property-spacing": "off",
    },
};
```
Включаем автофиксинг кода при сохранении в WebStorm в настройках проекта (`Ctrl + Alt + S`)

![](./readme-eslint.png)

## Подключение Vuetify к Nuxt 3

> Выполняется из директории проекта frontend

Установка Vuetify и его компонентов

- `npm install vuetify@next @mdi/font sass`

Создаем плагин `vuetify.js` в `plugins`. Если директории `plugins`, ее нужно создать.
Заполняем `vuetify.js` содержимым:

```javascript
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        theme: {
            defaultTheme: "dark",
        },
        components,
        directives,
    });
    nuxtApp.vueApp.use(vuetify);
});
```

Добавляем в конфигурацию `nuxt.conig.js` код для работы с Vuetify

```javascript
css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
], 
build: {
    transpile: ["vuetify"],
},
vite: {
    define: {
        "process.env.DEBUG": false,
    },
},
```

Теперь компоненты Vuetify можно использовать в Nuxt 3 

## Включение шаблонизатора Nuxt 3

> Выполняется из директории проекта frontend

Включение шаблонизатора позволит разделить структуру приложения Nuxt на общий шаблон (`layout`) и страницы (`pages`). Это общая практика создания приложений. 
Для включения шаблонизатора следует отказаться от точки входа приложения через `App.vue`, поэтому *удаляем* его.

Создаем директории `layouts` и `pages`. В `layouts` создаем `default.vue` с содержимым:

<blockquote>
<details>
<summary>default.vue</summary>

```vue
<template>
  <v-app>
    <v-navigation-drawer
        v-if="user"
        v-newValue="drawer"
        :rail="rail"
        permanent
        temporary
    >
      <v-list nav>
        <v-list-item @click="rail = !rail">
          <template #prepend>
            <v-icon>{{ rail ? "mdi-menu" : "mdi-menu-open" }}</v-icon>
          </template>
          <template #title>
            <div class="text-subtitle-1">nuxt3-strapi-starter</div>
          </template>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav>
        <v-list-item
            v-for="(page, index) in pages"
            :key="index"
            :title="page.title"
            :to="page.to"
            :prepend-icon="page.icon"
        />
      </v-list>
      <template #append>
        <v-list nav>
          <v-list-item
              :prepend-icon="
              theme.global.current.value.dark
                ? 'mdi-weather-night'
                : 'mdi-weather-sunny'
            "
              :title="
              theme.global.current.value.dark ? 'Dark theme' : 'Light theme'
            "
              @click="toggleTheme"
          />
          <v-list-item
              prepend-icon="mdi-account-circle"
              :title="user.username"
              :subtitle="user.email"
              to="/profile"
          />
        </v-list>
        <v-divider />
        <v-list nav>
          <v-list-item
              prepend-icon="mdi-logout"
              title="Logout"
              @click="logoutOperation"
          />
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
    <NotifySnackbar />

    <v-footer app absolute class="bg-transparent justify-center">
      <v-card density="compact" flat>
        <v-card-text>
          {{ new Date().getFullYear() }} &copy; <strong>deSoul</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script setup>
/* imports */
import { useTheme } from "vuetify";
const user = useStrapiUser();
const { logout } = useStrapiAuth();
const theme = useTheme();
/* data */
const drawer = ref(true);
const rail = ref(true);
const pages = [
  {
    icon: "mdi-home",
    title: "Home page",
    to: "/",
  },
  {
    icon: "mdi-book-open-page-variant",
    title: "Test page",
    to: "/test",
  },
];
/* methods */
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
const logoutOperation = async () => {
  await logout();
  await navigateTo("/auth/login");
};
</script>
```
</details>
</blockquote>

В `pages` создаем страницу`index.vue` с содержимым:

<blockquote>
<details>
<summary>index.vue</summary>

```vue
<template>
  <v-container fluid>
    <v-card prepend-icon="mdi-home">
      <template #title>
        Home
        <v-card-subtitle>First page</v-card-subtitle>
      </template>
      <v-divider />
      <v-card-text>
        <v-code>
          <pre>{{ flattenResponse(data) }}</pre>
        </v-code>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
/* imports */
const { find } = useStrapi();
const { flattenResponse } = useStrapiResponse();
/* middleware */
definePageMeta({ middleware: "auth" });
/* data */
const { data } = await find("tests");
/* computed */
/* methods */
</script>
```
</details>
</blockquote>

И страницу `test.vue` с содержимым:

<blockquote>
<details>
<summary>test.vue</summary>

```vue
<template>
  <v-container fluid>
    <v-card prepend-icon="mdi-book-open-page-variant">
      <template #title>
        Test
        <v-card-subtitle>Second page</v-card-subtitle>
      </template>
      <v-divider />
      <v-card-text> Some test content </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
/* imports */
/* middleware */
definePageMeta({ middleware: "auth" });
/* data */
/* computed */
/* methods */
</script>
```
</details>
</blockquote>

## Добавление авторизации

В `pages` создаем директорию `auth`, в ней создаем шаблоны страниц:

<blockquote>
<details>
<summary>login.vue</summary>

```vue
<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col class="v-col-12 v-col-md-4">
        <v-card prepend-icon="mdi-login">
          <template #title>
            Login
            <v-card-subtitle>Please authenticate</v-card-subtitle>
          </template>
          <v-divider />
          <v-card-text>
            <v-form ref="form" v-newValue="valid" @submit.prevent="loginOperation">
              <v-text-field
                v-newValue="username"
                label="E-mail or username"
                required
                :rules="loginRules"
              ></v-text-field>
              <v-text-field
                v-newValue="password"
                label="Password"
                required
                :append-inner-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="hidePassword ? 'password' : 'text'"
                :rules="passwordRules"
                @click:append-inner="() => (hidePassword = !hidePassword)"
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                class="mt-3"
                tile
                :isBusy="isBusy"
                color="green"
                solo
                block
                type="submit"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
          <v-divider />
          <v-card-text class="text-center bg-transparent py-3">
            <v-row dense no-gutters>
              <v-col class="text-left">
                <nuxt-link
                  class="text-decoration-none text-blue-darken-3"
                  to="/auth/forgot-password"
                >
                  Forgot password?
                </nuxt-link>
              </v-col>
              <v-col class="text-right">
                <nuxt-link
                  class="text-decoration-none text-blue-darken-3"
                  to="/auth/register"
                >
                  Registration
                </nuxt-link>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
/* imports */
const { login, fetchUser } = useStrapiAuth();
/* data */
const form = ref(null);
const valid = ref("");
const hidePassword = ref(true);
const isBusy = ref(false);
const username = ref("");
const password = ref("");
const loginRules = [
  (v) => !!v || "This field is required",
  (v) => v.length >= 3 || "Login must be more than 3 characters",
];
const passwordRules = [
  (v) => !!v || "This field is required",
  (v) => v.length <= 20 || "Password must be less than 20 characters",
];
/* computed */
/* methods */
const loginOperation = async () => {
  isBusy.value = true;
  if (form.value.save()) {
    try {
      await login({
        identifier: username.value,
        password: password.value,
      });
      await fetchUser();
      navigateTo("/");
    } catch (e) {
      console.log(e);
    }
    isBusy.value = false;
  }
};
/* hooks */
// onMounted(() => {});
</script>

```
</details>
</blockquote>

<blockquote>
<details>
<summary>register.vue</summary>

```vue
<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col class="v-col-12 v-col-md-4">
        <v-card prepend-icon="mdi-account-plus">
          <template #title>
            Register new account
            <v-card-subtitle> Obtain application features </v-card-subtitle>
          </template>
          <v-divider />
          <v-card-text>
            <v-form
              v-if="!waitConfirm"
              ref="form"
              v-newValue="valid"
              @submit.prevent="registerOperation"
            >
              <v-text-field
                v-newValue="username"
                label="Username"
                required
                type="text"
                :rules="loginRules"
              />
              <v-text-field
                v-newValue="email"
                label="E-mail"
                required
                type="text"
                :rules="emailRules"
              />
              <v-text-field
                v-newValue="password"
                label="Password"
                required
                :append-inner-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="hidePassword ? 'password' : 'text'"
                :rules="passwordRules"
                @click:append-inner="() => (hidePassword = !hidePassword)"
              />
              <v-btn
                :disabled="!valid"
                class="mt-3"
                tile
                :isBusy="isBusy"
                color="green"
                solo
                block
                type="submit"
              >
                Register
              </v-btn>
            </v-form>
            <v-alert v-else color="green">
              <p>
                User <b>{{ username }}</b> registered!
              </p>
              <p>
                Please check your email <b>{{ email }}</b> for account
                confirmation.
              </p>
              <p>After confirmation you can login to application.</p>
            </v-alert>
          </v-card-text>
          <v-divider />
          <v-card-text class="text-center bg-transparent py-3">
            <v-row dense no-gutters>
              <v-col class="text-left">
                <nuxt-link
                  class="text-decoration-none text-blue-darken-3"
                  to="/auth/forgot-password"
                >
                  Forgot password?
                </nuxt-link>
              </v-col>
              <v-col class="text-right">
                <nuxt-link
                  class="text-decoration-none text-blue-darken-3"
                  to="/auth/login"
                >
                  Login
                </nuxt-link>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
/* imports */
const { register, login, fetchUser } = useStrapiAuth();
const { setSnackbar } = useSnackbarStore();
/* data */
const form = ref(null);
const valid = ref("");
const hidePassword = ref(true);
const isBusy = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const waitConfirm = ref(false);
const loginRules = [
  (v) => !!v || "This field is required",
  (v) => v.length >= 3 || "Login must be more than 3 characters",
];
const emailRules = [
  (v) => !!v || "This field is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must have correct format",
];
const passwordRules = [
  (v) => !!v || "This field is required",
  (v) => v.length <= 20 || "Password must be less than 20 characters",
];
/* computed */
/* methods */
const registerOperation = async () => {
  isBusy.value = true;
  if (form.value.save()) {
    try {
      const { user } = await register({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      if (user.value.confirmed) {
        await login({
          identifier: username.value,
          password: password.value,
        });
        navigateTo("/");
      } else {
        waitConfirm.value = true;
      }
    } catch (e) {
      waitConfirm.value = false;
      console.log(e);
    }
  }
  isBusy.value = false;
};
/* hooks */
// onMounted(() => {});
</script>

```
</details>
</blockquote>

<blockquote>
<details>
<summary>forgot-password.vue</summary>

```vue
<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col class="v-col-12 v-col-md-4">
        <v-card prepend-icon="mdi-login">
          <template #title>
            Forgot password
            <v-card-subtitle>
              Set new password by email confirmation request
            </v-card-subtitle>
          </template>
          <v-divider />
          <v-card-text>
            <v-form
              v-if="message.length == 0"
              ref="form"
              v-newValue="valid"
              @submit.prevent="forgotOperation"
            >
              <v-text-field
                v-newValue="email"
                label="E-mail"
                required
                type="text"
                :rules="emailRules"
              />
              <v-btn
                :disabled="!valid"
                class="mt-3"
                tile
                :isBusy="isBusy"
                color="success"
                solo
                block
                type="submit"
              >
                Email me a reset link
              </v-btn>
            </v-form>
            <v-alert v-else color="green">
              <p>
                {{ message }}
              </p>
            </v-alert>
          </v-card-text>
          <v-divider />
          <v-card-text class="text-center bg-transparent py-3">
            <v-row dense no-gutters>
              <v-col class="text-left">
                <nuxt-link
                  class="text-decoration-none text-blue-darken-3"
                  to="/auth/register"
                >
                  Registration
                </nuxt-link>
              </v-col>
              <v-col class="text-right">
                <nuxt-link
                  class="text-decoration-none text-blue-darken-3"
                  to="/auth/login"
                >
                  Login
                </nuxt-link>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
/* imports */
const { forgotPassword } = useStrapiAuth();
/* data */
const form = ref(null);
const valid = ref("");
const isBusy = ref(false);
const email = ref("");
const message = ref("");
const emailRules = [
  (v) => !!v || "This field is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must have correct format",
];
/* computed */
/* methods */
const forgotOperation = async () => {
  isBusy.value = true;
  if (form.value.save()) {
    try {
      await forgotPassword({
        email: email.value,
      });
      message.value =
        "A reset password link has been sent to your email account. Please click on the link to complete the password reset.";
    } catch (e) {
      console.log(e);
    }
    isBusy.value = false;
  }
};
/* hooks */
// onMounted(() => {});
</script>
```
</details>
</blockquote>



## Добавление поддержки websocket

> Выполняется из директории проекта backend

Установки сервера SocketIO в Strapi

```shell
npm install socket.io
```

> Выполняется из директории проекта frontend

Установка клиента SocketIO в Nuxt

```shell
npm i nuxt-socket-io
```

Добавление в `nuxt.config.js`
```javascript
    modules: [
        "@nuxtjs/strapi",
        "@pinia/nuxt",
        "@nuxt/devtools",
        "nuxt-socket-io",
    ],
    io: {
        sockets: [
            {
                name: "main",
                url: process.env.STRAPI_URL || "http://127.0.0.1:1337",
            },
        ],
    },
```

## Добавление DevTools

Установка
```
npm i -D @nuxt/devtools
```

Добавление в `nuxt.config.js`

```javascript
  modules: ["@nuxt/devtools"],
  devtools: {
    enabled: true,
    vscode: {},
  },
```

DevTools можно будет включить по нажатию `Alt / ⌥ Option + D` или при нажатии кнопки Nuxt снизу

# Полезные ссылки

https://itnext.io/nuxt-3-first-steps-c23d142405c4
