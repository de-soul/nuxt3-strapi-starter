<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="start"
    open-on-hover
  >
    <template #activator="{ props }">
      <v-btn density="compact" flat icon v-bind="props" variant="text">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-subheader> Actions</v-list-subheader>
        <v-divider />
        <!-- Iterate all available actions -->
        <crud-menu-action-content
          v-for="(action, index) in actions"
          :key="index"
          :action="action"
        />
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup>
/* Imports */
const { systemFields } = useStrapiHelpers();
/* Props */
const props = defineProps({
  row: Object,
});
/* Data */
const menu = ref(false);
const actionsDefault = ref([
  {
    title: "All fields",
    subtitle: "All row fields",
    type: "iterable",
    icon: "mdi-history",
    content: [],
  },
  {
    title: "Timings",
    subtitle: "Datetime values",
    type: "iterable",
    icon: "mdi-clock",
    content: [],
  },
]);
/* Computed */
const actions = computed(() => {
  return actionsDefault.value.map((a) => {
    switch (a.title) {
      case "Timings":
        return {
          ...a,
          content: getTimings(),
        };
      case "All fields":
        return {
          ...a,
          content: getFields(),
        };
      default:
        return { ...a };
    }
  });
});
/* Methods */
const getTimings = () => {
  const getSysField = (name) =>
    systemFields.value.find((s) => s.name === name && s.type === "datetime");
  return props.row
    .filter((r) => getSysField(r.name))
    .map((r) => ({
      title: r.value,
      subtitle: r.name,
      icon: getSysField(r.name).icon,
    }));
};

const getFields = () => {
  return props.row
    .filter((r) => r.name && r.name !== "data-table-select")
    .map((r) => ({
      title: r.value,
      subtitle: r.name,
    }));
};
</script>
