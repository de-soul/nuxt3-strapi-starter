<template>
  <v-card variant="flat" elevation="5">
    <v-data-table
      v-model="selectedRows"
      :headers="headers"
      :items="items"
      :search="search"
      show-select
    >
      <template #top>
        <crud-template-header
          :collection="collection"
          :columns="columns"
          :delete-list="selectedRows"
          :editable-items="editableItems"
          :search="search"
          @deleted="selectedRows = []"
          @search="search = $event"
          @unselected-columns="unselectedColumns = $event"
        />
      </template>
      <!-- Iterate every item in row -->
      <template
        v-for="(column, index) in columns"
        :key="`row-${item.columns.id}-${index}`"
        #[`item.${column.name}`]="{ item }"
      >
        <crud-template-item
          v-if="index !== columns.length - 1"
          :id="item.columns.id"
          :collection="collection"
          :editable="column.editable"
          :field="column.name"
          :text="
            item.columns[column.name]
              ? item.columns[column.name].toString()
              : ''
          "
        />
        <crud-menu-action-button
          v-if="index === columns.length - 1 && headers.length !== 1"
          :row="getRow(item.columns)"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
/* Imports */
const sqlManager = useSqlManagerStore();
const { systemFields } = useStrapiHelpers();
const search = ref("");
/* Props */
const props = defineProps({
  collection: String,
});
/* Data */
const selectedRows = ref([]);
const unselectedColumns = ref([]);
const headerDefaults = ref({
  key: "",
  value: "",
  title: "",
  align: "start",
  minWidth: "100px",
});

const actionsDefaults = ref({
  column: {
    name: "",
    active: true,
    editable: true,
  },
  header: {
    key: "",
    sortable: false,
    width: 46,
  },
});
/* Computed */
const items = computed(() => sqlManager.items(props.collection));
const headers = computed(() => {
  if (items.value.length > 0) {
    const headers = Object.keys(items.value[0])
      .filter((e) => !unselectedColumns.value.includes(e))
      .map((e) => ({
        ...headerDefaults.value,
        ...headerOptions(e),
      }));
    headers.push({
      ...headerDefaults.value,
      ...actionsDefaults.value.header,
    });
    return headers;
  }
  return [];
});
const editableItems = computed(() =>
  columns.value.filter((c) => c.editable && c.name).map((c) => c.name)
);
const columns = computed(() => {
  if (items.value.length > 0) {
    const columns = Object.keys(items.value[0]).map((e) => ({
      name: e,
      active: isActive(e),
      editable: isEditable(e),
    }));
    columns.push(actionsDefaults.value.column);
    return columns;
  }
  return [];
});
/* Methods */
const headerOptions = (field) => {
  return {
    key: field,
    value: field,
    title: field,
  };
};
const isActive = (field) => !unselectedColumns.value.includes(field);
const isEditable = (field) => !systemFields.value.find((f) => f.name === field);
const getRow = (item) =>
  Object.entries(item).map(([name, value]) => ({
    name: name,
    value: value ? value : "",
  }));
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
