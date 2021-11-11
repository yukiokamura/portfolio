<template>
  <Slider />
</template>

<script>
import Slider from "./components/Slider.vue";

export default {
  name: "App",
  components: {
    Slider
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
