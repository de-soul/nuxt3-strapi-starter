<template>
  <v-container fluid>
    <v-card prepend-icon="mdi-home">
      <template #title>
        Home
        <v-card-subtitle>First page</v-card-subtitle>
      </template>
      <v-divider />
      <v-card-text>
        <v-container>
          <crud-datatable collection="tests" />
        </v-container>
      </v-card-text>
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
/* hooks */
</script>
