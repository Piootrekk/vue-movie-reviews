<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black opacity-50 z-40"
      @click="closeMenu"
    ></div>
    <div
      v-if="isOpen"
      class="fixed top-0 w-1/2 right-0 bg-gray-900 border border-gray-700 flex-col h-screen z-50"
    >
      <SvgIcon
        :path="mdiMenuOpen"
        type="mdi"
        size="40"
        @click="closeMenu"
        class="mx-auto my-10"
      />
      <HeaderSearch class="mb-6" />
      <HeaderNavItems class="mb-12 justify-center flex" />
      <ul>
        <li
          v-for="(item, index) in itemIconMapper"
          :key="index"
          @click="handleClickedItem(item)"
          class="px-6 py-4 cursor-pointer hover:bg-gray-800 focus:outline-none rounded-lg flex"
        >
          <svg-icon
            class="mr-2"
            v-if="item.icon !== null"
            type="mdi"
            :path="item.icon"
            size="30"
          ></svg-icon>
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import HeaderNavItems from "./HeaderNavItems.vue";
import HeaderSearch from "./HeaderSearch.vue";
import { headerLoggedItems, headerNotLoggedItems } from "@/utils/utils";
import { mdiMenuOpen } from "@mdi/js";
import { useStore } from "vuex";
import { computed, watchEffect, ref } from "vue";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  name: "MenuNavMobile",
  components: { SvgIcon, HeaderNavItems, HeaderSearch },
  setup(props, { emit }) {
    const store = useStore();
    const isUserAuthenticated = computed(
      () => store.getters["firebaseAuthModule/isAuthenticated"]
    );
    const itemIconMapper = ref(headerNotLoggedItems);

    watchEffect(() => {
      itemIconMapper.value = isUserAuthenticated.value
        ? headerLoggedItems
        : headerNotLoggedItems;
    });
    const closeMenu = () => {
      emit("close");
    };
    const handleClickedItem = (item) => {
      item.action();
    };

    return {
      closeMenu,
      mdiMenuOpen,
      itemIconMapper,
      handleClickedItem,
    };
  },
};
</script>
