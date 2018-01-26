let state = {
   winHeight: $(window).height(),
   /*
   {
     name: "首页",
     isOpen: true,
     url: '',
     showLoading: false, //显示loading
     iframeId: util.getRandomId()
   }
   */
   tabData:[],   //云眼tab数据
   currentTabName: window.G.currentTabName,
   showLoading: true, //显示loading
}

let getters = {

}

let mutations = {
   calcWinHeight: function(state){
      state.winHeight = $(window).height();
   }
}

let actions = {

}

import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import $ from 'jquery';
import 'iview/dist/styles/iview.css';
import util from '../libs/util.js';

Vue.use($);
Vue.use(Vuex);
Vue.use(iView);
export default  new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
