<template>
  <v-app>
    <v-navigation-drawer
      v-if="user"
      v-model="drawer"
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
