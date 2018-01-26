import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title : "云眼"
    window.document.title = title;
};


//ajax配置

let ajaxUrl = "";
if(env === "development"){
   ajaxUrl = "http://192.168.3.205:8018/services";
}else if(env === "production"){
   ajaxUrl = window.G.path;
}

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 60000
});


//响应拦截到登录页
util.ajax.interceptors.response.use(function (response) {
  //只对内网访问有作用,登陆页不拦截
  if(response.data.code == -1 && response.data.msg == "登录已经过期，请重新登录!"){
     window.location.href = window.G.baseUrl+"/yunyan/";
  }
  return response;
  //对响应数据做些事
},function(error){
  return Promise.reject(error);
});


//时间转换
import  dateFormat from "format-datetime";
util.dateFormat = dateFormat;

/*
使用实例
util.dateFormat(date,'yyyy-MM-dd')

*/

//生成一个随机id
util.getRandomId = function(){
  let a = ["A",'B','C','D','E','F','G','H','I','J','K','L','N','M','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  let str = "";
  for(let i=0;i<9;i++){
    let n = parseInt(Math.random()*25);
    str+=a[n];
  }
  return str;
}


//16进制转rgba
util.hexToRgb = function(hex,opacity){
    var color = [], rgba = [];

    hex = hex.replace(/#/,"");

    if (hex.length == 3) { // 处理 "#abc" 成 "#aabbcc"
        var tmp = [];
        for (var i = 0; i < 3; i++) {
            tmp.push(hex.charAt(i) + hex.charAt(i));
        }
        hex = tmp.join("");
    }

    for (var i = 0; i < 3; i++) {
        color[i] = "0x" + hex.substr(i * 2, 2);
        rgba.push(parseInt(Number(color[i])));
    }
    rgba.push(opacity);
    return "rgba(" + rgba.join(",") + ")";
};




export default util;
