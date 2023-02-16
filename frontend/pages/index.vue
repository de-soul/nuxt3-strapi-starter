<template>
  <v-container fluid>
    <v-card prepend-icon="mdi-home">
      <template #title>
        Home
        <v-card-subtitle>First page</v-card-subtitle>
      </template>
      <v-divider />
      <v-card-text>
        <v-code>
          <pre>{{ flattenResponse(data) }}</pre>
        </v-code>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
/* imports */
const { find } = useStrapi();
const { flattenResponse } = useStrapiResponse();
/* middleware */
definePageMeta({ middleware: "auth" });
/* data */
const { data } = await find("tests");
/* computed */
/* methods */
</script>
