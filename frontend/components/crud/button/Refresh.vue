<template>
  <v-btn :disabled="loading" :loading="loading" flat icon @click="refreshData">
    <v-icon> mdi-refresh</v-icon>
  </v-btn>
</template>

<script setup>
/* Imports */
const sqlManager = useSqlManagerStore();
const snackbar = useSnackbarStore();
/* Props */
const props = defineProps({
  collection: String,
});
/* Data */
const loading = ref(false);
/* Methods */
const refreshData = async () => {
  loading.value = true;
  if (await sqlManager.find(props.collection)) {
    await snackbar.setSnackbar({
      show: true,
      color: "green-darken-2",
      title: `Success`,
      message: `Data from ${props.collection} successfully reloaded`,
    });
  }
  loading.value = false;
};
</script>
