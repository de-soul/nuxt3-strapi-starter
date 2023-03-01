<template>
  <v-toolbar color="blue-grey-darken-4" flat>
    <!--    <v-toolbar-title>-->
    <!--    CRUD: /{{ collection }}-->
    <!--      <strong>-->
    <!--        {{ collection }}-->
    <!--      </strong>-->
    <!--      collection-->
    <!--    </v-toolbar-title>-->
    <crud-filters-search
      :search="search"
      class="max-width-search"
      @search="emit('search', $event)"
    />
    <v-spacer></v-spacer>
    <v-toolbar-items class="align-center justify-center">
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
      <crud-buttons-refresh
        :collection="collection"
        @refresh="emit('refresh')"
      />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script setup>
/* Imports */
const emit = defineEmits(["deleted", "search", "refresh"]);
/* Props */
defineProps({
  search: String,
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

<style scope>
.min-width-title {
  min-width: 300px;
}
.max-width-search {
  max-width: 300px;
}
</style>
