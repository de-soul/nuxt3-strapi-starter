<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link to="/" style="text-decoration: none; color: inherit">
          nuxt-3-strapi-starter
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-switch
          inset
          class="pr-3 pt-1"
          :prepend-icon="
            theme.name.value === 'dark'
              ? 'mdi-weather-night'
              : 'mdi-weather-sunny'
          "
          @click="toggleTheme"
        >
        </v-switch>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :title="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
        />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
    <v-footer app absolute>
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} &copy; <strong>deSoul</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
/* imports */
import { useTheme } from "vuetify";
/* data */
const drawer = ref(false);
const items = [
  {
    icon: "mdi-home",
    title: "Home",
    to: "/",
  },
  {
    icon: "mdi-book-open-page-variant",
    title: "Test",
    to: "/test",
  },
];
const theme = useTheme();
/* methods */
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>
