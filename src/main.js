import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form as VForm, Field as VField, ErrorMessage, defineRule, configure ,} from 'vee-validate';
import { email, required } from '@vee-validate/rules';
import { createI18n } from 'vue-i18n';
import { localize } from '@vee-validate/i18n'
import zh_TW from './i18n/zh_TW'
import vue3GoogleLogin from "vue3-google-login";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store  from'./store/storeIndex';
//可能會爆炸
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

defineRule('email', email);
defineRule('required', required);
localize('zh_TW', zh_TW);

configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true,
});



const i18n = createI18n({
  locale: 'zh_TW',
  messages: {
    zh_TW: zh_TW
  }
});


const app = createApp(App);
app.use(vue3GoogleLogin, {
	clientId:
		'377415139720-ag6i61vogl2m2is8vanh47ikomr67vsk.apps.googleusercontent.com',
});

app.component('VForm', VForm);
app.component('VField', VField);
app.component('ErrorMessage', ErrorMessage);
//可能會爆炸
app.use(ElementPlus);
app.use(i18n);
app.use(store);
app.use(router);
app.mount("#app");
