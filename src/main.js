import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import SIdentify from './components/page/Identify';    //自定义组件
import "babel-polyfill";

Vue.component("SIdentify",SIdentify);
Vue.use(ElementUI);

axios.defaults.baseURL = "http://localhost:8080/api"
Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
