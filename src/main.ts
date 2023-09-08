/*
 * @Descripttion:
 * @version:
 * @Author: 程
 * @Date: 2022-06-30 17:18:52
 * @LastEditors: 程
 * @LastEditTime: 2022-07-15 16:27:58
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/reset.less';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { createPinia } from 'pinia';
import '@/permission';
import i18n from '@/i18n/index';
import * as ElIcons from '@element-plus/icons-vue';
import { getTimeRange, parseDate, debounce } from '@/utils';
import { TIME_RANGE, PARSE_DATE, DEBOUNCE } from '@/symbol';
import btnAntiShake from '@/utils/directive';

const store = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElIcons)) {
  app.component(key, component);
}

app.provide(TIME_RANGE, getTimeRange);
app.provide(PARSE_DATE, parseDate);
app.provide(DEBOUNCE, debounce);

app.use(btnAntiShake);
app.use(i18n);
app.use(router);
app.use(ElementPlus);
app.use(store);
app.mount('#app');
