<script setup>
import BodyWrapper from "@/layout/StyleWrappers/BodyWrapper.vue";
import Header from "@/layout/Header/Header.vue";
</script>

<template>
  <Header />
  <BodyWrapper>
    <template v-slot:main-movie>
      <h1>This is an about page</h1>
    </template>
  </BodyWrapper>
</template>
