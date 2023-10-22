<template>
  <Header />
  <h1>{{ HelloWord }}</h1>
  
</template>

<script>
import Header from './layout/Header/Header.vue';
export default {
  components: {
    Header,
  },
  name: "App",
  data() {
    return {
      HelloWord: "Hello World",
    };
  },
  methods: {},
};
</script>

<style></style>
