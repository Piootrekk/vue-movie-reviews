<template>
  <Header />
  <MainText />
  <MainContainer />
</template>

<script>
import Header from "./layout/Header/Header.vue";
import MainText from "./layout/Main/MainText.vue";
import MainContainer from "./layout/Main/MainContainer.vue";
export default {
  components: {
    Header,
    MainText,
    MainContainer,
  },
  name: "App",
};
</script>
<style></style>
