<template>
  <v-toolbar color="blue-grey-darken-4" flat>
    <v-toolbar-title>
      CRUD actions on
      <strong>
        {{ collection }}
      </strong>
      collection
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <crud-dialogs-delete
        :delete-list="deleteList"
        :collection="collection"
        @deleted="emit('deleted')"
      />
      <crud-dialogs-add
        :editable-items="editableItems"
        :rules="rules"
        :collection="collection"
      />
      <crud-buttons-refresh :collection="collection" />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script setup>
/* Imports */
const emit = defineEmits(["deleted"]);
const sqlManager = useSqlManager();
/* Props */
defineProps({
  collection: String,
  editableItems: Array,
  deleteList: Array,
});
/* Data */
/* Methods */
const rules = ref([
  (v) => !!v || "Text required",
  (v) => (v && v.length <= 255) || "Field must be less than 255 characters",
]);
</script>
