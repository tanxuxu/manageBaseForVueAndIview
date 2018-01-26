<template>
<div class="index">
  <gov-head></gov-head>
  <!-- tabs -->
  <yunyan-tabs></yunyan-tabs>
</div>
</template>
<script>
import head from '../common/head.vue'; //头部
import yunyanTabs from '../common/tabs.vue';
export default {
  data() {
    return {
      currentView: "swiper", //当前显示的组件
    }
  },
  computed: {
    contentHeight: function() {
      return this.$store.state.winHeight - 102;
    },
    //地图 高度
    mapHeight: function() {
      return this.contentHeight * 0.65 - 65;
    }
  },
  mounted() {
    let _this = this;
    $(window).resize(function(event) {
      _this.$store.commit("calcWinHeight");
    });
    //遍历所有的echart对象,去自适应窗口
    let echartAll = this.$store.state.myChartAll;
    window.onresize = function() {
      for (let i = 0; i < echartAll.length; i++) {
        echartAll[i].resize();
      }
    };
  },
  methods: {

  },
  components: {
    govHead: head,
    yunyanTabs
  }
};
</script>
<style scoped lang="less">
.index {
    background: url("../../img/main_bg.jpg") no-repeat;
    background-size: cover;
}
</style>
