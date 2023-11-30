<template>
  <Header />
  <BodyWrapper>
    <template v-slot:main-movie>
      <h1>TU NARAZIE NIE MA NIC ¯\_(ツ)_/¯</h1>
    </template>
  </BodyWrapper>
</template>

<script>
import BodyWrapper from "@/components/BodyWrapper.vue";
import Header from "@/layout/Header/Header.vue";
export default {
  name: "MovieDetails",
  components: {
    Header,
    BodyWrapper,
  },
};
</script>
