<template>
  <div id="app">
    <DownloadExample/>
  </div>
</template>

<script>
import DownloadExample from "./components/DownloadExample.vue";

export default {
  name: "app",
  components: {
    DownloadExample
  }
};
</script>

<style>
:root {
  --main-color: #f5f3f3;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--main-color);
}
html {
  background-color: var(--main-color);
}
</style>
