<script setup>
// Snackbar.vue
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiClose,
  mdiInformation,
  mdiCheck,
  mdiAlertCircle,
  mdiAlert,
} from "@mdi/js";
import { onBeforeMount, defineProps, ref } from "vue";

const props = defineProps({
  type: {
    required: true,
    type: String,
    validator: (value) => {
      return ["info", "success", "warning", "error"].includes(value);
    },
    default: "info",
  },
  title: {
    required: true,
    type: String,
  },
});

let styles = {};
const show = ref(true);

onBeforeMount(() => {
  styles = getStyles();
  setTimeout(() => {
    show.value = false;
  }, 3000);
});

const getStyles = () => {
  switch (props.type) {
    case "info":
      return {
        icon: mdiInformation,
        containerClass: "bg-blue-200 text-blue-900",
        titleClass: "text-blue-900",
        contentClass: "text-blue-800",
        buttonClass: "text-blue-900/70 hover:text-blue-900 hover:bg-blue-200",
      };
    case "success":
      return {
        icon: mdiCheck,
        containerClass: "bg-green-200 text-green-900",
        titleClass: "text-green-900",
        contentClass: "text-green-800",
        buttonClass:
          "text-green-900/70 hover:text-green-900 hover:bg-green-200",
      };
    case "warning":
      return {
        icon: mdiAlertCircle,
        containerClass: "bg-yellow-200 text-yellow-900",
        titleClass: "text-yellow-900",
        contentClass: "text-yellow-800",
        buttonClass:
          "text-yellow-900/70 hover:text-yellow-900 hover:bg-yellow-200",
      };
    case "error":
      return {
        icon: mdiAlert,
        containerClass: "bg-red-200 text-red-900",
        titleClass: "text-red-900",
        contentClass: "text-red-800",
        buttonClass: "text-red-900/70 hover:text-red-900 hover:bg-red-200",
      };
  }
};
</script>

<script>
export default {
  name: "SnackbarAlert",
};
</script>

<template>
  <Transition leave-active-class="duration-300" leave-to-class="opacity-0">
    <div
      v-if="show"
      :class="[styles.containerClass, 'flex p-4 rounded-md  w-96 h-22 ']"
    >
      <div class="shrink-0">
        <SvgIcon
          v-if="styles.icon"
          :path="styles.icon"
          type="mdi"
          class="w-6 h-6"
        />
      </div>
      <div class="flex-1 space-y-2 ml-3">
        <h2 :class="[styles.titleClass, 'font-medium']">{{ props.title }}</h2>
        <div :class="[styles.contentClass, 'text-sm']"><slot></slot></div>
      </div>
      <div class="shrink-0">
        <button
          @click="() => (show = false)"
          :class="[styles.buttonClass, 'rounded-md p-0.5 -m-1']"
        >
          <SvgIcon :path="mdiClose" type="mdi" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </Transition>
</template>
