<template>
  <v-btn
    icon
    flat
    size="24"
    class="mb-1"
    variant="text"
    :disabled="loading"
    @click="emit('editClick')"
  >
    <v-progress-circular v-if="loading" indeterminate size="18">
    </v-progress-circular>
    <v-icon v-if="!loading" size="16"> mdi-pencil </v-icon>
  </v-btn>
</template>

<script setup>
/* Imports */
const emit = defineEmits(["editClick"]);
/* Props */
const props = defineProps({
  loading: Boolean,
});
</script>
