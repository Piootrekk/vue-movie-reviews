<template>
  <img :src="mySVG" :height="height" :width="width" alt="camera"/>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    height: String,
    width: String,
  },
  data() {
    return {
      mySVG: require("@/assets/icons/camera.svg"),
    };
  },
};
</script>
