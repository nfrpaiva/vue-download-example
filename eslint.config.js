import pluginVue from 'eslint-plugin-vue';

export default [
  { ignores: ['dist'] },
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        console: 'readonly'
      }
    }
  }
];
