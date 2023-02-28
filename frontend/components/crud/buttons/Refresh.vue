<template>
  <v-btn flat icon @click="refreshData">
    <v-icon> mdi-refresh </v-icon>
  </v-btn>
</template>

<script setup>
/* Imports */
const sqlManager = useSqlManager();
/* Props */
const props = defineProps({
  collection: String,
});
/* Methods */
const refreshData = async () => {
  await sqlManager.find(props.collection);
};
</script>
