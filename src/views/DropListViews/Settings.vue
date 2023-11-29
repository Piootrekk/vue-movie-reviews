<template>
  <Header />
  <BodyWrapper>
    <template v-slot:main-movie>
      <h1>Settings</h1>
    </template>
  </BodyWrapper>
</template>

<script>
import BodyWrapper from "@/components/BodyWrapper.vue";
import Header from "@/layout/Header/Header.vue";

export default {
  name: "AboutPage",
  components: {
    Header,
    BodyWrapper,
  },
};
</script>
