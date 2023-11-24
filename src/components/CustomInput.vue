<template>
  <div class="mb-12 mt-8">
    <div class="relative">
      <input
        :id="label"
        :name="label"
        :value="modelValue"
        @input="handleInput"
        v-bind="$attrs"
        class="pl-4 rounded peer h-10 border-b-2 bg-gray-700 border-gray-400 text-gray-100 placeholder-transparent focus:outline-none focus:border-gray-400 focus:border-b-2 transition-colors"
        placeholder=" "
      />
      <label
        :for="label"
        class="cursor-text absolute left-2 -top-5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-100 peer-focus:text-sm"
      >
        {{ label }}
      </label>
      <p v-if="!isValid" class="text-red-500 text-xs mt-1 absolute">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

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
