<template>
  <v-form :ref="`item-${id}-${index}`">
    <v-text-field
      v-model="newValue"
      :variant="editable ? 'filled' : 'plain'"
      class="justify-space-around"
      :rules="[(v) => !!v || 'Не может быть пустым']"
      :color="editing ? 'success' : ''"
      hide-details
      density="compact"
      :readonly="!editing"
    >
      <template #append-inner>
        <v-row v-show="editable" no-gutters justify="center" align="center">
          <v-col>
            <crud-buttons-edit
              v-if="!editing"
              :loading="loading"
              @editClick="editClick"
            />
            <crud-buttons-save
              v-else
              :loading="loading"
              @updateClick="updateClick"
            />
          </v-col>
        </v-row>
      </template>
    </v-text-field>
  </v-form>
</template>

<script setup>
/* Imports */
const sqlManager = useSqlManager();
const emit = defineEmits(["updated"]);
/* Props */
const props = defineProps({
  index: Number,
  id: Number,
  field: String,
  value: String,
  editable: Boolean,
  collection: String,
});
/* Data */
const loading = ref(false);
const newValue = ref(props.value);
const editing = ref(false);
/* Methods */
const updateClick = async () => {
  loading.value = true;
  const payload = {
    [props.field]: newValue.value,
  };
  if (await sqlManager.update(props.collection, props.id, payload)) {
    await sqlManager.find(props.collection);
    editing.value = false;
    emit("updated");
  }
  loading.value = false;
};
const editClick = async () => {
  loading.value = true;
  editing.value = true;
  loading.value = false;
};

/* Hooks */
onMounted(() => {
  // newValue.value = props.value;
});
</script>

<style>
.v-field--appended {
  padding-inline-end: 6px;
}
.v-field.v-field--appended {
  --v-field-padding-start: 6px;
}
</style>
