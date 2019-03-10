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
    <fieldset :disabled="aguardando">
      <button class="btn btn-primary" @click="handleDownloadFetch">Download using fetch</button>
      
      <button class="btn btn-success" @click="handleDownloadAxios">Download usin Axios</button>
      
      <button class="btn btn-warning" @click="handleDownloadHRef">Download usin HRef</button>
    </fieldset>
    <div class="aguarde">
      <h1>Aguarde</h1>
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
    aguarde(enable) {
      if (enable) {
        document.querySelector(".aguarde").style.display = "block";
        this.aguardando = true;
      } else {
        document.querySelector(".aguarde").style.display = "none";
        this.aguardando = false;
      }
    },
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
      //Necessário para funcionar no Firefox
      document.body.appendChild(el);
      el.click();
      //Importante remover o elemento para não consumir/reter muita memória
      el.remove();
    },
    handleDownloadHRef() {
      window.location.assign("/pdf/spring-boot-reference.pdf");
    },
    handleDownloadAxios() {
      this.aguarde(true);
      axios
        .get("/pdf/spring-boot-reference.pdf", {
          responseType: "arraybuffer"
        })
        .then(res => {
          let header = res.headers["content-disposition"] || "";
          let filename = this.getHeaderFileName(header);
          let blob = new Blob([res.data], { type: "application/pdf" });
          this.createElementWithBlob(blob, filename);
        })
        .catch(e => console.log(e))
        .finally(() => {
          console.log("finally");
          this.aguarde(false);
        });
    },
    handleDownloadFetch() {
      this.aguarde(true);
      document.querySelector(".aguarde").style.display = "block";
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
        .catch(e => console.log(e))
        .finally(() => {
          console.log("finally");
          this.aguarde(false);
        });
    }
  },
  data() {
    return {
      aguardando: false,
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
table {
  width: 60vw;
  margin: 0% auto;
}
.aguarde {
  display: none;
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
  box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
}
</style>
