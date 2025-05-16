import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint2';
import stylelintPlugin from 'vite-plugin-stylelint';
import svgoPlugin from 'vite-plugin-svgo';

import * as configs from '@brybrant/configs';

import favicon from './scripts/favicon.js';

export default defineConfig(({ mode }) => {
  const development = mode === 'development';

  return {
    base: '/role-colors/',
    build: {
      minify: development ? true : 'terser',
      ...(!development && {
        terserOptions: configs.terserConfig,
      }),
    },
    css: {
      postcss: configs.postCSSConfig,
    },
    plugins: [
      stylelintPlugin({
        lintInWorker: true,
        config: configs.stylelintConfig,
      }),
      svgoPlugin(configs.svgoConfig),
      eslintPlugin({
        lintInWorker: true,
      }),
      favicon(),
    ],
    server: {
      host: '127.0.0.1',
      port: 3000,
      strictPort: true,
    },
  };
});
