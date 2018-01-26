import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import store from './vuex/store.js';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import $ from "jquery";
import util from './libs/util.js';
import './style/style.less';




Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use($);
Vue.use(iView);

Vue.prototype.$ajax = util.ajax; //将ajax赋值到vue下面

// 路由配置
const RouterConfig = {
    mode: 'history',
    base: '/resManage/',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

let vm = new Vue({
    el: '#app',
    router: router,
    store: store,  //this.$store.state
    render: h => h(App)
});





//未登录处理
// import Env from './config/env';
// if(Env == "production"){   //生产环境
//   $.ajaxSetup({
//     statusCode:{
//       499:function() {
//          alert(2222);
//          window.location.href = window.G.baseUrl+"/yunyan"; //没有登录跳转到登录页
//       }
//     }
//   });
// }
