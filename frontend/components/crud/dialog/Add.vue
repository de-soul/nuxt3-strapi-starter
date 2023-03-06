<template>
  <v-dialog
    v-model="dialog"
    max-width="400px"
    persistent
    transition="dialog-top-transition"
  >
    <template #activator="{ props }">
      <v-btn dark flat icon v-bind="props">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card :loading="loading">
      <v-card-title>
        New <strong>{{ collection }}</strong> element
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" v-model="formModel" validate-on="input">
          <v-row v-for="(item, i) in items" :key="i" dense>
            <v-col>
              <v-text-field
                v-model="itemModel[item]"
                :label="item"
                :rules="rules"
                clearable
                density="compact"
                variant="filled"
                @click:clear="formValid"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="!formModel"
          color="blue-darken-1"
          variant="outlined"
          @click="addClick"
        >
          Save
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="cancelClick">
          Cancel
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
/* Imports */
const sqlManager = useSqlManagerStore();
/* Data */
const form = ref(false);
const dialog = ref(false);
const itemModel = ref({});
const formModel = ref(false);
const loading = ref(false);
/* Props */
const props = defineProps({
  collection: String,
  editableItems: Array,
  rules: Array,
});

/* Computed */
const items = computed(() =>
  props.editableItems.length > 0 ? props.editableItems : ["name"]
);
/* Methods */
const formValid = async () => {
  const { valid } = await form.value.validate();
  return valid;
};
const addClick = async () => {
  loading.value = true;
  if (formValid) {
    if (await sqlManager.add(props.collection, itemModel.value)) {
      await sqlManager.find(props.collection);

      dialog.value = false;
      itemModel.value = {};
    }
  }
  loading.value = false;
};
const cancelClick = async () => {
  dialog.value = false;
  itemModel.value = {};
};
</script>
