<template>
  <div
    v-if="isOpen"
    class="fixed top-20 right-0 p-4 bg-gray-900 border border-gray-700"
  >
    <ul class="list-none">
      <li>
        <a href="#" class="block py-2 px-3 hover:bg-gray-800 focus:outline-none"
          >Opcja 1</a
        >
      </li>
      <li>
        <a href="#" class="block py-2 px-3 hover:bg-gray-800 focus:outline-none"
          >Opcja 2</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  name: "MenuNavMobile",
  components: {},
  setup() {
    return {};
  },
};
</script>
