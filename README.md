# vue-download-example

Exemplos de download de arquivos com Vue 3 (`<script setup>`, Composition API) e Vite:
`fetch`, Axios e link direto (href).

## Requisitos
Node.js >= 20.19

## Scripts
```
npm install
npm run dev      # desenvolvimento (proxy /pdf -> docs.spring.io)
npm run build    # build de produção
npm run preview  # pré-visualiza o build
npm run lint
```

A lógica de download fica em `src/composables/useDownload.js` e os utilitários
(nome do arquivo, salvar Blob) em `src/utils/download.js`.
