<template>
  <v-container>
    <v-card prepend-icon="mdi-book-open-page-variant">
      <template #title>
        Test
        <v-card-subtitle>Second page</v-card-subtitle>
      </template>
      <v-card-text> Some test content </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
/* imports */
/* middleware */
definePageMeta({ middleware: "auth" });
/* data */
/* computed */
/* methods */
</script>
