<template>
  <div class="mb-8">
    <label class="block text-gray-700 text-sm font-bold mb-2">{{
      label
    }}</label>
    <input
      :value="modelValue"
      @input="handleInput"
      v-bind="$attrs"
      class="w-full p-2 border rounded"
    />
    <p v-if="!isValid" class="text-red-500 text-xs mt-1 absolute">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";

defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const isValid = ref(true);
const emit = defineEmits(["update:modelValue", "handleInput"]);

const handleInput = (e) => {
  emit("update:modelValue", e.target.value);
  emit("handleInput", isValid);
};
</script>
