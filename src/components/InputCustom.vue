<template>
  <div>
    <label> {{ label }} </label>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="input"
      @input="validateInput"
      class="border border-gray-700 rounded-lg px-4 py-2 mb-2"
    />
    <label class="text-red-500 text-sm"> {{ error }} </label>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "InputField",
  props: {
    label: String,
    type: String,
    placeholder: String,
    value: String,
    error: String,
  },
  setup(props, context) {
    const input = ref(props.value || "");

    const validateInput = () => {
      context.emit("update:modelValue", input.value);
    };

    watch(
      () => props.value,
      (newValue) => {
        input.value = newValue;
      }
    );

    return { input, validateInput };
  },
};
</script>

<!-- <div class="flex items-center justify-center h-screen bg-gray-900">
  <div class="relative">
                <input id="email" name="email" type="text" class="rounded peer h-10  border-b-2 bg-gray-700 border-gray-400 text-gray-100 placeholder-transparent focus:outline-none focus:border-gray-400 focus:border-b-2 transition-colors" placeholder=" " />
                <label for="email" class="absolute left-2 -top-5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-100 peer-focus:text-sm">Email address</label>
              </div></div> 
            https://play.tailwindcss.com/GCs0zYsGfQ-->
