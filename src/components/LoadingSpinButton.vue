<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiLoading } from "@mdi/js";
import { defineProps } from "vue";

defineProps({
  label: {
    type: String,
    default: "",
  },
});

const path = mdiLoading;
</script>

<template>
  <div class="flex justify-center">
    <SvgIcon
      class="animate-spin h-5 w-5 mr-3"
      type="mdi"
      :path="path"
      size="15"
    />
    {{ label }}
  </div>
</template>
