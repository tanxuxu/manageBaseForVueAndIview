<template lang="html">
  <div class="head-box">
     <div class="head-top">
       <Row>
         <Col span="12">
           <h1 style="opacity:0;">云眼多网数据应用平台</h1>
         </Col>
       </Row>
     </div>
     <gov-nav></gov-nav>
  </div>
</template>

<script>
import govNav from './nav.vue';
import util from "../../libs/util";
export default {
  created() {
    //获取访问量统
  },
  filters: {
    //格式化数字,千分位逗号表示
    formateNumber: function(val) {
      let value = val.toString();
      return value.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
  },
  mounted() {},
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    govNav
  }
}
</script>

<style lang="less" scoped="true">
.head-box {
    height: 102px;
}
.head-top {
    height: 66px;
    background: url("../../img/logo_01.png") no-repeat left top;
}
.head-top ul.menu_ul {
    float: right;
    margin-top: 23px;
    margin-right: 10px;
}
.head-top ul.menu_ul > li {
    float: left;
    color: #7d8ba1;
    margin: 0 5px;
}
.head-top span {
    color: #fff;
}
.head-top .daySee {
    margin-right: 20px;
    position: relative;
    top: 3px;
}
.head-top .allSee {
    position: relative;
    top: 3px;
    margin-right: 12px;
}
.head-top .userInfo span {
    position: relative;
    top: -3px;
    margin: 0 5px;
    color: #7d8ba1;
}
.head-top .userInfo span i {
    font-size: 16px;
    margin: 0 5px;
    color: #fff;
    position: relative;
    top: 2px;
}
</style>
