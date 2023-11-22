<template>
  <div class="flex justify-center">
    <svg-icon
      class="animate-spin h-5 w-5 mr-3"
      type="mdi"
      :path="path"
      size="15"
    ></svg-icon>
    {{ label }}
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiLoading } from "@mdi/js";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  components: {
    SvgIcon,
  },
  name: "LoadingSpinButton",
  setup() {
    const path = mdiLoading;
    return {
      path,
    };
  },
};
</script>
