<template>
  <div class="container">
    <h1>Exemplos de como se fazer download de arquivos com Vue.js</h1>
    <fieldset :disabled="aguardando">
      <button class="btn btn-primary" @click="handleDownloadFetch">Download using fetch</button>
      <button class="btn btn-success" @click="handleDownloadAxios">Download usin Axios</button>
      <button class="btn btn-warning" @click="handleDownloadResource">Download usin Resource</button>
      <button class="btn btn-info" @click="handleDownloadHRef">Download usin HRef</button>
    </fieldset>
    <div class="aguarde">
      <h1>Aguarde</h1>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import request from "request";
import downloads from "../resources/download";
export default {
  name: "DownloadExample",
  components: {},
  mounted() {},
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
        return;
      }
      let result = contentDisposition
        .split("filename=")[1]
        .replace(new RegExp('"', "g"), "");
      return result;
    },
    createElementWithBlob(blob, filename) {
      const el = document.createElement("a");
      // Internet Explorer 11 Hack
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        el.href = window.URL.createObjectURL(blob);
        el.download = filename;
        //Necessário para funcionar no Firefox
        document.body.appendChild(el);
        el.click();
        el.remove();
      }
    },
    handleDownloadHRef() {
      this.aguarde(true);
      window.location.assign("/pdf/spring-boot-reference.pdf");
    },
    handleDownloadAxios() {
      this.aguarde(true);
      axios
        .get("/pdf/spring-boot-reference.pdf", {
          responseType: "arraybuffer"
        })
        .then(res => {
          let header = res.headers["content-disposition"];
          let filename = this.getHeaderFileName(header);
          if (!filename) {
            let arry = res.config.url.split("/");
            filename = arry[arry.length - 1];
          }
          let blob = new Blob([res.data], { type: "application/pdf" });
          this.createElementWithBlob(blob, filename);
        })
        .catch(e => console.log("handleDownloadAxios- Erro", e))
        .finally(() => {
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
          if (!filename) {
            let arry = res.url.split("/");
            filename = arry[arry.length - 1];
          }
          return res.blob();
        })
        .then(blob => {
          this.createElementWithBlob(blob, filename);
        })
        .catch(e => console.log(e))
        .finally(() => {
          this.aguarde(false);
        });
    },
    handleDownloadResource() {
      this.aguarde(true);
      let filename;
      /*
       * Verificar a configuração de options para o formato blob no arquivo ../resources/download.js.
       */
      downloads
        .pdf()
        .then(res => {
          let header = res.headers.get("Content-Disposition");
          filename = this.getHeaderFileName(header);
          if (!filename) {
            let arry = res.url.split("/");
            filename = arry[arry.length - 1];
          }
          return res.blob();
        })
        .then(blob => {
          this.createElementWithBlob(blob, filename);
        })
        .catch(e => console.log("vue-resources erro: ", e))
        .finally(() => this.aguarde(false));
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
.container {
  margin-top: 40vh;
  background-color: #e8e7e7;
  padding: 1rem;
}
h1 {
  color: var(--gray);
}
</style>
