<script setup>
import { useDownload } from '../composables/useDownload';

const { loading, downloadWithFetch, downloadWithAxios, downloadWithHref } =
  useDownload();
</script>

<template>
  <div class="container">
    <h1>Exemplos de como se fazer download de arquivos com Vue.js</h1>
    <fieldset :disabled="loading">
      <button
        class="btn btn-primary"
        @click="downloadWithFetch"
      >
        Download usando fetch
      </button>
      <button
        class="btn btn-success"
        @click="downloadWithAxios"
      >
        Download usando Axios
      </button>
      <button
        class="btn btn-info"
        @click="downloadWithHref"
      >
        Download usando href
      </button>
    </fieldset>
    <div
      v-if="loading"
      class="aguarde"
    >
      <h1>Aguarde</h1>
    </div>
  </div>
</template>

<style scoped>
.btn {
  margin: 3px;
}
.aguarde {
  position: fixed;
  border: 1px solid #a2a2a2;
  width: 200px;
  height: 54px;
  text-align: center;
  top: 50vh;
  left: 50vw;
  margin-top: -27px;
  margin-left: -100px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 2px 2px 2px rgb(0 0 0 / 25%);
}
.container {
  margin-top: 40vh;
  background-color: #e8e7e7;
  padding: 1rem;
}
h1 {
  color: var(--bs-gray);
}
</style>
