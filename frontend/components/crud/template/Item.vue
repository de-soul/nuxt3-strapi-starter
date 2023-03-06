<template>
  <v-form v-model="form" validate-on="input">
    <v-text-field
      v-model="model"
      :color="edited ? 'success' : ''"
      :readonly="!editable"
      :rules="[rules.required, rules.counter]"
      :variant="editable ? 'filled' : 'plain'"
      class="justify-space-around"
      density="compact"
      hide-details
    >
      <template #append-inner>
        <v-row v-show="editable" align="center" justify="center" no-gutters>
          <v-col>
            <v-btn
              :disabled="!form || model === initialValue || loading"
              :loading="loading"
              class="mb-1"
              flat
              icon
              size="24"
              variant="text"
              @click="saveClick"
            >
              <v-icon size="16"> mdi-text-box-edit-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-text-field>
  </v-form>
</template>

<script setup>
/* Imports */
const sqlManager = useSqlManagerStore();
/* Props */
const props = defineProps({
  id: Number,
  field: String,
  text: String,
  editable: Boolean,
  collection: String,
});
/* Data */
const form = ref(false);
const model = ref(props.text);
const initialValue = ref(props.text);
const loading = ref(false);
const rules = ref({
  required: (value) => !!value || "Required.",
  counter: (value) => value.length <= 255 || "Max 255 characters",
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
});
/* Computed */
const edited = computed(() => model.value !== initialValue.value);
/* Watch */
watch(
  () => props.text,
  (newValue) => {
    if (model.value === initialValue.value) {
      initialValue.value = newValue;
    }
    model.value = newValue;
  }
);
/* Methods */
const saveClick = async () => {
  if (form.value) {
    loading.value = true;
    const payload = {
      [props.field]: model.value,
    };
    if (await sqlManager.update(props.collection, props.id, payload)) {
      await sqlManager.find(props.collection);
      // emit("updated");
      initialValue.value = model.value;
    }
    loading.value = false;
  }
};
</script>

<style>
.v-field--appended {
  padding-inline-end: 6px;
}

.v-field.v-field--appended {
  --v-field-padding-start: 6px;
}
</style>
