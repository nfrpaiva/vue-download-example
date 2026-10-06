import { ref } from 'vue';
import axios from 'axios';
import {
  getFileNameFromUrl,
  getHeaderFileName,
  saveBlob
} from '../utils/download';

export const PDF_URL = '/pdf/spring-boot-reference.pdf';

export function useDownload() {
  const loading = ref(false);

  async function run(task) {
    loading.value = true;
    try {
      await task();
    } catch (error) {
      console.error('Erro no download', error);
    } finally {
      loading.value = false;
    }
  }

  const downloadWithFetch = () =>
    run(async () => {
      const res = await fetch(PDF_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const filename =
        getHeaderFileName(res.headers.get('Content-Disposition')) ||
        getFileNameFromUrl(res.url);
      saveBlob(await res.blob(), filename);
    });

  const downloadWithAxios = () =>
    run(async () => {
      const res = await axios.get(PDF_URL, { responseType: 'blob' });
      const filename =
        getHeaderFileName(res.headers['content-disposition']) ||
        getFileNameFromUrl(PDF_URL);
      saveBlob(res.data, filename);
    });

  const downloadWithHref = () =>
    run(async () => {
      window.location.assign(PDF_URL);
    });

  return { loading, downloadWithFetch, downloadWithAxios, downloadWithHref };
}
