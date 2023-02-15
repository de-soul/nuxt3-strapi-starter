<template>
  <v-snackbar
    v-model="snackbarShowSync"
    :color="color"
    :timeout="timeout"
    multi-line
  >
    <div class="text-subtitle-1 pb-2">{{ title }}</div>
    <p v-html="message" />
    <template #actions>
      <v-btn icon @click="clearSnackbar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
/* imports */
const snackbarStore = useSnackbarStore();
const { show, color, title, message, timeout } = storeToRefs(snackbarStore);
const { setSnackbar, clearSnackbar } = useSnackbarStore();
/* computed */
const snackbarShowSync = computed({
  get() {
    return show.value;
  },
  set(value) {
    setSnackbar({ show: value });
  },
});
</script>
