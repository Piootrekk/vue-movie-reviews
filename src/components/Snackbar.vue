<script setup>
import svgIcon from "@jamescoyle/vue-icon";
import { mdiClose, mdiInformation, mdiCheck, mdiAlertCircle ,  mdiAlert, mdiCheckbook } from "@mdi/js";

const props = defineProps({
  type: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
});



const getStyles = () => {
  switch (props.type) {
    case "info":
      return {
        icon: mdiInformation,
        containerClass: "bg-blue-100 text-blue-900",
        titleClass: "text-blue-900",
        contnentClass: "text-blue-800",
        buttonClass:
          "text-blue-900/70 hover:text-blue-900 hover:bg-blue-200",
      }
    case "success":
      return {
        icon: mdiCheck,
        containerClass: "bg-green-100 text-green-900",
        titleClass: "text-green-900",
        contnentClass: "text-green-800",
        buttonClass:
          "text-green-900/70 hover:text-green-900 hover:bg-green-200",
      }
    case "warning":
      return {
        icon: mdiAlertCircle,
        containerClass: "bg-yellow-100 text-yellow-900",
        titleClass: "text-yellow-900",
        contnentClass: "text-yellow-800",
        buttonClass:
          "text-yellow-900/70 hover:text-yellow-900 hover:bg-yellow-200",
      }
    case "error":
      return {
        icon: mdiAlert,
        containerClass: "bg-red-100 text-red-900",
        titleClass: "text-red-900",
        contnentClass: "text-red-800",
        buttonClass:
          "text-red-900/70 hover:text-red-900 hover:bg-red-200",
      }
};

});
</script>
<template>
  <div class="flex p-4 rounded-md space-x-3 bg-blue-100">
    <div class="shrink-0">
      <svgIcon :path="icon" type="mdi" class="w-6 h-6 text-blue-700" />
    </div>
    <div class="flex-1 space-y-2">
      <h2 class="font-medium text-blue-900">Title</h2>
      <div class="text-sm text-blue-800">Content</div>
      <div class="shrink-0">
        <button
          class="text-blue-900/70 hover:text-blue-900 hover:bg-blue-200 rounded-md p-0.5 -m-1"
        >
          <svgIcon :path="mdiClose" type="mdi" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>
