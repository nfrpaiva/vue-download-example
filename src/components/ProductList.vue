<template>
  <div class="container">
    <h1>Product List</h1>
    <table class="table">
      <thead>
        <th>id</th>
        <th>Nome</th>
      </thead>
      <tbody>
        <tr v-for="item in dados" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.descricao}}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="btn btn-primary" @click="handleDownloadFetch">Download using fetch</button>
      
      <button class="btn btn-success" @click="handleDownloadAxios">Download usin Axios</button>
      
      <button class="btn btn-warning" @click="handleDownloadHRef">Download usin HRef</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import request from "request";
export default {
  name: "ProductList",
  components: {},
  methods: {
    getHeaderFileName(contentDisposition) {
      if (!contentDisposition) {
        return "defaultname.pdf";
      }
      let result = contentDisposition
        .split("filename=")[1]
        .replace(new RegExp('"', "g"), "");
      return result;
    },
    createElementWithBlob(blob, filename) {
      const el = document.createElement("a");
      el.href = window.URL.createObjectURL(blob);
      el.download = filename;
      el.click();
    },
    handleDownloadHRef() {
      window.location.assign("/pdf/spring-boot-reference.pdf");
    },
    handleDownloadAxios() {
      axios
        .get("/pdf/spring-boot-reference.pdf", {
          responseType: "arraybuffer"
        })
        .then(res => {
          let header = res.headers["content-disposition"] || "";
          console.log("headerx", header);
          let filename = this.getHeaderFileName(header);
          let blob = new Blob([res.data], { type: "application/pdf" });
          this.createElementWithBlob(blob, filename);
        })
        .catch();
    },
    handleDownloadFetch() {
      let filename;
      fetch("/pdf/spring-boot-reference.pdf")
        .then(res => {
          let header = res.headers.get("Content-Disposition") || "";
          filename = this.getHeaderFileName(header);
          return res.blob();
        })
        .then(blob => {
          this.createElementWithBlob(blob, filename);
        })
        .catch(e => console.log(e));
    }
  },
  data() {
    return {
      dados: [
        {
          id: 1,
          descricao: "Um teste"
        },
        {
          id: 2,
          descricao: "Outro Teste"
        }
      ]
    };
  }
};
</script>
<style scoped>
.btn {
  margin: 3px;
}
</style>
