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
          <v-form ref="form" v-model="formModel" validate-on="input">
            <v-row v-for="(item, i) in items" :key="i">
              <v-col>
                <v-text-field
                  v-model="itemModel[item]"
                  variant="filled"
                  density="compact"
                  :label="item"
                  clearable
                  :rules="rules"
                  @click:clear="formValid"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue-darken-1"
          variant="outlined"
          :disabled="!formModel"
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
