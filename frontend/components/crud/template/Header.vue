<template>
  <v-toolbar color="transparent" flat>
    <v-toolbar-title>
      <v-chip pill size="large">
        <v-avatar color="blue-darken-2" start>
          <v-icon>mdi-hammer-screwdriver</v-icon>
        </v-avatar>
        {{ collection }}
      </v-chip>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="align-center justify-center">
      <crud-filter-search
        :search="search"
        class="min-width-search"
        @search="$emit('search', $event)"
      />
      <crud-dialog-delete
        :collection="collection"
        :delete-list="deleteList"
        @deleted="$emit('deleted')"
      />
      <crud-dialog-add
        :collection="collection"
        :editable-items="editableItems"
        :rules="rules"
      />
      <crud-menu-column-button
        :columns="columns"
        @unselected-columns="$emit('unselected-columns', $event)"
      />
      <!--      :columns="columns"-->
      <!--      <crud-menu-column-button v-model:model="model" />-->
      <crud-button-refresh :collection="collection" />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script setup>
/* Props */
defineProps({
  search: String,
  collection: String,
  editableItems: Array,
  deleteList: Array,
  columns: Array,
});
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

.min-width-search {
  min-width: 240px;
}
</style>
