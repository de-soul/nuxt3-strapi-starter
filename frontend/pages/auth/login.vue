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
            <v-form ref="form" v-model="valid" @submit.prevent="loginOperation">
              <v-text-field
                v-model="username"
                label="E-mail or username"
                required
                :rules="loginRules"
              ></v-text-field>
              <v-text-field
                v-model="password"
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
                :loading="loading"
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
  loading.value = true;
  if (form.value.validate()) {
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
    loading.value = false;
  }
};
/* hooks */
// onMounted(() => {});
</script>
