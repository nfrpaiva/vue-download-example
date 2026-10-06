import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/pdf': {
        target: 'https://docs.spring.io/spring-boot/docs/current/reference/',
        changeOrigin: true
      }
    }
  }
});
