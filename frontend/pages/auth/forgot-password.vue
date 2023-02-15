<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col class="v-col-12 v-col-md-4">
        <v-card prepend-icon="mdi-login">
          <template #title>
            Forgot password
            <v-card-subtitle>
              Set new password by email confirmation request
            </v-card-subtitle>
          </template>
          <v-card-text>
            <v-form
              v-if="message.length == 0"
              ref="form"
              v-model="valid"
              @submit.prevent="forgotOperation"
            >
              <v-text-field
                v-model="email"
                label="E-mail"
                required
                type="text"
                :rules="emailRules"
              />
              <v-btn
                :disabled="!valid"
                class="mt-3"
                tile
                :loading="loading"
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
const loading = ref(false);
const email = ref("");
const message = ref("");
const emailRules = [
  (v) => !!v || "This field is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must have correct format",
];
/* computed */
/* methods */
const forgotOperation = async () => {
  loading.value = true;
  if (form.value.validate()) {
    try {
      await forgotPassword({
        email: email.value,
      });
      message.value =
        "A reset password link has been sent to your email account. Please click on the link to complete the password reset.";
    } catch (e) {
      console.log(e);
    }
    loading.value = false;
  }
};
/* hooks */
// onMounted(() => {});
</script>
