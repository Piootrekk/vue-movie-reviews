<script setup>
import LoadingSpinButton from "@/components/LoadingSpinButton.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { defineProps } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isButtonDisabled: {
    type: Boolean,
    default: false,
  },
  withIcon: {
    type: String,
    default: "",
  },
  handleClick: {
    type: Function,
    default: () => {},
  },
});

const handleButtonClick = () => {
  if (!props.isButtonDisabled && !props.isLoading) {
    props.handleClick();
  }
};
</script>

<template>
  <button
    class="p-2 rounded hover:opacity-80 bg-blue-500 text-white"
    type="submit"
    :disabled="props.isButtonDisabled || props.isLoading"
    :class="{
      'bg-gray-300 text-gray-500 cursor-not-allowed':
        props.isButtonDisabled || props.isLoading,
    }"
    @click="handleButtonClick"
  >
    <template v-if="props.isLoading">
      <LoadingSpinButton label="Processing..." />
    </template>
    <template v-else>
      <span v-if="props.withIcon">
        <SvgIcon :path="props.withIcon" type="mdi" class="mx-1" />
      </span>
      <span v-else>
        {{ props.label }}
      </span>
    </template>
  </button>
</template>
