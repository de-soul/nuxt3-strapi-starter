<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    persistent
    transition="dialog-top-transition"
  >
    <template #activator="{ props }">
      <v-btn dark flat v-bind="props" icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card :loading="loading">
      <v-card-title>
        <span class="text-h5">
          New <strong>{{ collection }}</strong> element
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row v-for="(item, i) in editableItems" :key="i">
              <v-col>
                <v-text-field
                  v-model="model[item]"
                  variant="filled"
                  density="compact"
                  :label="item"
                  :rules="rules"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue-darken-1" variant="outlined" @click="addItem">
          Save
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Cancel
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
/* Imports */
const sqlManager = useSqlManager();
/* Data */
const form = ref(false);
const dialog = ref(false);
const model = ref({});
const loading = ref(false);
/* Props */
const props = defineProps({
  collection: String,
  editableItems: Array,
  rules: Array,
});
/* Methods */
const addItem = async () => {
  loading.value = true;
  const { valid } = await form.value.validate();
  if (valid) {
    if (await sqlManager.add(props.collection, model.value)) {
      await sqlManager.find(props.collection);
      dialog.value = false;
      model.value = {};
    }
  }
  loading.value = false;
};
</script>
