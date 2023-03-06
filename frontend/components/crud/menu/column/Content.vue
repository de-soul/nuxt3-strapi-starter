<template>
  <v-list
    v-model:selected="selected"
    select-strategy="classic"
    @update:selected="$emit('unselected-columns', invertModel(selected))"
  >
    <v-list-subheader>Columns</v-list-subheader>
    <v-divider />
    <v-list-item
      v-for="(column, index) in cleanColumns"
      :key="`column-list-${index}`"
      :active="column.active"
      :title="column.name"
      :value="column.name"
      color="blue-darken-2"
    >
      <template #prepend="{ isActive }">
        <v-list-item-action start>
          <!--          <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>-->
          <v-icon class="mr-2" size="14">
            {{ isActive ? "mdi-eye-outline" : "mdi-eye-off-outline" }}
          </v-icon>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
/* Data */
const selected = ref([]);
/* Props */
const props = defineProps({
  columns: Array,
});
const cleanColumns = computed(() => props.columns.filter((f) => f.name));
/* Methods */
const invertModel = (model) =>
  props.columns.filter((c) => !model.includes(c.name)).map((c) => c.name);
/* Hook */
onMounted(() => {
  selected.value =
    props.columns.filter((s) => s.active).map((s) => s.name) || [];
});
</script>
