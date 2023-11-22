<template>
    <button
      class="w-full mt-8 p-2 rounded"
      type="submit"
      :disabled="isButtonDisabled || isLoading"
      :class="{
        'bg-blue-500 text-white': !isButtonDisabled && !isLoading,
        'bg-gray-300 text-gray-500 cursor-not-allowed':
          isButtonDisabled || isLoading,
      }"
      @click="handleButtonClick"
    >
      <template v-if="isLoading">
        <LoadingSpinButton label="Processing..." />
      </template>
      <template v-else>{{ label }}</template>
    </button>
  </template>
  
  <script>
  import LoadingSpinButton from "@/components/LoadingSpinButton.vue";

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
      handleClick: {
        type: Function,
        default: () => {},
      },
    },
    components: {
      LoadingSpinButton,
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