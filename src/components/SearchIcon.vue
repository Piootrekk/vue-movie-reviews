<template>
    <img :src="mySVG" :height="heigth" :width="width" alt="camera" class="hover:text-gray-400"/>
  </template>
  
  <script>
  export default {
    name: "SearchIcon",
    props: {
      heigth: String,
      width: String,
    },
    data() {
      return {
        mySVG: require("@/assets/icons/search.svg"),
      };
    },
  };
  </script>
  