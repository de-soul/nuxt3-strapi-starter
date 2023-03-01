<template>
  <v-btn flat icon :disabled="loading" :loading="loading" @click="refreshData">
    <v-icon> mdi-refresh </v-icon>
  </v-btn>
</template>

<script setup>
/* Imports */

const emit = defineEmits(["refresh"]);
const sqlManager = useSqlManagerStore();
const loading = ref(false);
/* Props */
const props = defineProps({
  collection: String,
});
/* Methods */
const refreshData = async () => {
  loading.value = true;
  if (await sqlManager.find(props.collection)) {
    loading.value = false;
  }
  emit("refresh");
};
</script>
