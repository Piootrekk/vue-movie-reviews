<template>
  <div class="mx-auto container flex mt-6">
    <h2 class="uppercase text-yellow-500 font-extrabold leading-none text-xl items-center flex ">
      {{ popularTitle }}
    </h2>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "MainText",
  setup() {
    const popularTitle = ref("Popular Movies");
    return {
      popularTitle,
    };
  },
};
</script>