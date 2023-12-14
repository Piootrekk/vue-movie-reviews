<script setup>
import BodyWrapper from "@/layout/StyleWrappers/BodyWrapper.vue";
import Header from "@/layout/Header/Header.vue";
</script>

<template>
  <Header />
  <BodyWrapper>
    <template v-slot:main-movie>
      <h1 class="justify-center">VIEW NOT FOUND ERROR 404</h1>
    </template>
  </BodyWrapper>
</template>
