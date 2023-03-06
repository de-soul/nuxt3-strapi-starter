<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="start"
    open-on-hover
  >
    <template #activator="{ props }">
      <v-list-item :title="action.title" link v-bind="props">
        <template #append>
          <v-icon color="grey-lighten-1">{{ action.icon }}</v-icon>
        </template>
      </v-list-item>
    </template>

    <v-card>
      <v-list v-if="action.type === 'iterable'">
        <v-list-subheader> {{ action.subtitle }}</v-list-subheader>
        <v-divider />
        <v-list-item
          v-for="(item, index) in action.content"
          :key="index"
          :subtitle="item.subtitle"
          :title="item.title"
          link
        >
          <template #prepend>
            <v-icon v-if="item.icon" color="grey-lighten-1">
              {{ item.icon }}
            </v-icon>
          </template>
        </v-list-item>
      </v-list>
      <v-card-text v-if="action.type === 'another'">
        {{ action }}
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup>
/* Data */
const menu = ref(false);
/* Props */
defineProps({
  action: Object,
});
</script>
