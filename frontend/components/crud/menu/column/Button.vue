<template>
  <v-menu :close-on-content-click="false" location="bottom" open-on-hover>
    <template #activator="{ props }">
      <v-btn flat icon v-bind="props">
        <v-icon>mdi-view-column</v-icon>
      </v-btn>
    </template>
    <v-card>
      <!-- Iterate all available actions -->
      <crud-menu-column-content
        :columns="columns"
        @unselected-columns="$emit('unselected-columns', $event)"
      />
    </v-card>
  </v-menu>
</template>

<script setup>
/* Props */
const props = defineProps({
  columns: Array,
});
</script>
