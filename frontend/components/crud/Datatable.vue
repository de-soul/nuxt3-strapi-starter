<template>
  <v-card density="compact" elevation="3">
    <!--    {{ items }}-->
    <v-data-table
      v-model="selectedRows"
      :items="items"
      :headers="headers"
      show-select
    >
      <template #top>
        <crud-templates-header
          :collection="collection"
          :editable-items="editableItems"
          :delete-list="selectedRows"
          @deleted="selectedRows = []"
        />
      </template>
      <template
        v-for="(header, index) in headers"
        #[`item.${header.key}`]="{ item }"
        :key="`row-${index}`"
      >
        <crud-templates-item
          :id="item.columns.id"
          :index="index"
          :field="header.key"
          :value="item.columns[header.key].toString()"
          :editable="header.editable"
          :collection="collection"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
/* Imports */
const sqlManager = useSqlManager();
/* Props */
const props = defineProps({
  collection: String,
});
/* Data */
const selectedRows = ref([]);
const systemFields = ref(["id", "createdAt", "updatedAt"]);
/* Watch */
/* Computed */
const items = computed(() => sqlManager.items(props.collection));
const headers = computed(() =>
  items.value.length > 0
    ? Object.keys(items.value[0]).map((e) => ({
        key: e,
        value: e,
        title: e,
        align: "start",
        width: "200px",
        editable: systemFields.value.includes(e) ? false : true,
      }))
    : []
);
const editableItems = computed(() =>
  headers.value.filter((h) => h.editable).map((h) => h.key)
);
/* Methods */
/* Hooks */
onMounted(async () => {
  await sqlManager.find(props.collection);
});
</script>

<style>
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tbody > tr > td {
  padding: 0 6px;
}
.v-data-table__td {
  line-height: 0.8rem;
}
.v-data-table__td .v-field--variant-plain .v-field__input {
  padding: 0;

  font-size: 0.9rem;
}
</style>
