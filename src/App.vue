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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
