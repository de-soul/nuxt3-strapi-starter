<template>
  <v-text-field
    :model-value="search"
    class="px-3 min-width-search"
    clearable
    density="compact"
    hide-details
    label="Search"
    variant="underlined"
    @update:modelValue="emit('search', $event)"
  />
</template>

<script setup>
defineProps({
  search: String,
});
const emit = defineEmits(["search"]);
</script>
