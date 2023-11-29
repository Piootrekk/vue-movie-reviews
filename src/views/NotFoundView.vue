<template>
  <Header />
  <BodyWrapper>
    <template v-slot:main-movie>
      <h1 class="justify-center">VIEW NOT FOUND ERROR 404</h1>
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
