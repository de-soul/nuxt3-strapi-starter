<template>
  <v-text-field
    :model-value="search"
    density="compact"
    hide-details
    class="px-3 min-width-search"
    clearable
    label="Filter"
    variant="outlined"
    @update:modelValue="emit('search', $event)"
  />
</template>

<script setup>
const props = defineProps({
  search: String,
});
const model = ref("");
const emit = defineEmits(["search"]);
</script>
