<!-- 
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
</script> -->

<template>
  <RegisterPage />
</template>

<script>
import RegisterPage from "./views/RegisterPage.vue";

export default {
  components: {
    RegisterPage,
  },
  name: "App",
};
</script>