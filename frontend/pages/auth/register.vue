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
              v-model="valid"
              @submit.prevent="registerOperation"
            >
              <v-text-field
                v-model="username"
                label="Username"
                required
                type="text"
                :rules="loginRules"
              />
              <v-text-field
                v-model="email"
                label="E-mail"
                required
                type="text"
                :rules="emailRules"
              />
              <v-text-field
                v-model="password"
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
                :loading="loading"
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
  loading.value = true;
  if (form.value.validate()) {
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
  loading.value = false;
};
/* hooks */
// onMounted(() => {});
</script>
