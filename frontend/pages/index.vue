<template>
  <v-container>
    <v-card prepend-icon="mdi-home">
      <template #title>
        Home
        <v-card-subtitle>First page</v-card-subtitle>
      </template>
      <v-card-text>
        <v-code>
          <pre>{{ response }}</pre>
        </v-code>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const { find } = useStrapi();
const { data } = await find("tests");
const response = computed(() =>
  data.map((r) => ({ id: r.id, ...r.attributes }))
);
</script>
