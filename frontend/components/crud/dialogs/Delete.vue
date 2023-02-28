<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    persistent
    transition="dialog-top-transition"
  >
    <template #activator="{ props }">
      <v-btn
        v-if="deleteList.length > 0"
        color="error"
        flat
        prepend-icon="mdi-minus-circle"
        v-bind="props"
        icon
      >
        <v-badge :content="deleteList.length" color="error">
          <v-icon>mdi-minus</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card :loading="loading">
      <v-card-text>Confirm deletion</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue-darken-1" variant="outlined" @click="deleteItems">
          Delete
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Cancel
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
/* Imports */
const emit = defineEmits(["deleted"]);
const sqlManager = useSqlManager();
/* Data */
const dialog = ref(false);
const loading = ref(false);
/* Props */
const props = defineProps({
  collection: String,
  deleteList: Array,
});
/* Methods */
const deleteItems = async () => {
  loading.value = true;
  if (await sqlManager.bulkDelete(props.collection, props.deleteList)) {
    await sqlManager.find(props.collection);
    dialog.value = false;
    emit("deleted");
  }
  loading.value = false;
};
</script>
