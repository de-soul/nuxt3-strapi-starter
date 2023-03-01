<template>
  <v-btn
    icon
    flat
    size="24"
    class="mb-1"
    variant="text"
    :disabled="!enabled"
    @click="emit('updateClick')"
  >
    <v-progress-circular v-if="loading" indeterminate size="18">
    </v-progress-circular>
    <v-icon v-if="!loading" size="16" :color="enabled ? 'green' : 'red'">
      mdi-content-save
    </v-icon>
  </v-btn>
</template>

<script setup>
/* Imports */
const emit = defineEmits(["updateClick"]);
/* Props */
const props = defineProps({
  loading: Boolean,
  enabled: Boolean,
});
</script>
