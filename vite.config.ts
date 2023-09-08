/*
 * @Descripttion:
 * @version:
 * @Author: 程
 * @Date: 2022-03-23 15:25:05
 * @LastEditors: 程
 * @LastEditTime: 2022-10-20 13:57:50
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [
    vue(),
    //自动引入vue
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-import.d.ts'
    })
  ],
  resolve: {
    //配置别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000, //端口
    proxy: {
      '/api': {
        target: 'http://47.96.82.137:4343',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境移除console.log
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  //处理 'UTF-8' vite重复编码问题
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  }
});
