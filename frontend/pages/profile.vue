<template>
  <v-container fluid>
    <v-card prepend-icon="mdi-book-open-page-variant">
      <template #title>
        Profile
        <v-card-subtitle>Personal page</v-card-subtitle>
      </template>
      <v-divider />
      <v-card-text>
        <v-list density="compact">
          <v-list-item
            v-for="(item, idx) in Object.keys(user)"
            :key="idx"
            :title="item"
            :subtitle="user[item]"
          />
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
/* imports */
const user = useStrapiUser();
/* middleware */
definePageMeta({ middleware: "auth" });
/* data */
/* computed */
/* methods */
</script>
