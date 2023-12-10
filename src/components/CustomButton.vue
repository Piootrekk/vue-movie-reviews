<template>
  <button
    class="p-2 rounded hover:opacity-80 bg-blue-500 text-white"
    type="submit"
    :disabled="isButtonDisabled || isLoading"
    :class="{
      'bg-gray-300 text-gray-500 cursor-not-allowed':
        isButtonDisabled || isLoading,
    }"
    @click="handleButtonClick"
  >
    <template v-if="isLoading">
      <LoadingSpinButton label="Processing..." />
    </template>
    <template v-else>
      <span v-if="withIcon">
        <SvgIcon :path="withIcon" type="mdi" class="mx-1" />
      </span>
      <span v-else>
        {{ label }}
      </span>
    </template>
  </button>
</template>

<script>
import LoadingSpinButton from "@/components/LoadingSpinButton.vue";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
  props: {
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
      required: false,
      default: "",
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
  components: {
    LoadingSpinButton,
    SvgIcon,
  },
  name: "CustomButton",
  setup(props) {
    const handleButtonClick = () => {
      if (!props.isButtonDisabled && !props.isLoading) {
        props.handleClick();
      }
    };

    return {
      handleButtonClick,
    };
  },
};
</script>
