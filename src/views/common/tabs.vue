<template lang="html">
  <Tabs type="card" :value="currentTabName" :closable="true" :animated="false" class="yunyanTabs" @on-click="clickTab" @on-tab-remove="tabRemove">
      <TabPane :closable="item.name!=defaltTabName" v-for="item in tabData" :label="item.name" v-if="item.isOpen" :name="item.name" :key="item.name">
        <Spin fix v-if="item.name!=defaltTabName && item.showLoading" class="loadingBox">
           <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
           <div>加载中...</div>
       </Spin>
        <iframe :name="item.name" class="allIframe" :height="contentHeight" :src="item.url" :id="item.name" width="100%"  style="border:none; margin-top:5px;"></iframe>
      </TabPane>
  </Tabs>
</template>

<script>
import util from "../../libs/util";
export default {
  mounted() {
    let defaultTab = window.G.currentTab;
    let obj = {
      name: defaultTab.name,
      isOpen: true,
      url: defaultTab.path,
      showLoading: false, //显示loading
      iframeId: util.getRandomId()
    }
    this.$store.state.tabData.push(obj);
  },
  computed: {
    tabData: function() {
      return this.$store.state.tabData;
    },
    contentHeight: function() {
      return this.$store.state.winHeight - 102 - 40;
    },
    currentTabName: function() {
      console.log(this.$store.state.currentTabName);
      return this.$store.state.currentTabName;
    },
    showLoading: function() {
      return this.$store.state.showLoading;
    },
    defaltTabName: function() {
      return window.G.currentTab.name;
    }
  },
  methods: {
    tabRemove: function(name) {
      let tabData = this.$store.state.tabData;
      //直接去掉该项,避免缓存太多数据
      for (let i = 0; i < tabData.length; i++) {
        if (tabData[i].name == name) {
          tabData.splice(i, 1);
        }
      }
      //将上一项做为选中项
      let tabDataLen = this.$store.state.tabData.length;
      this.$store.state.currentTabName = this.$store.state.tabData[tabDataLen - 1].name;
    },
    clickTab: function(name) {
      if (name == '首页') {
        this.$store.state.currentTabName = name;
      }
    }
  }
}
</script>

<style lang="less">
body {
    overflow: hidden;
}
.yunyanTabs .ivu-tabs-bar {
    border-bottom: 0 !important;
    margin: 3px 6px 0;
}
.yunyanTabs .ivu-tabs-tab {
    background: #082758 !important;
    color: #999 !important;
    border: none !important;
    border-radius: 3px !important;
}
.yunyanTabs .ivu-tabs-tab-active {
    color: #fff !important;
    background: #0072FF !important;
    i {
        color: #fff !important;
    }
}
.yunyanTabs .ivu-tabs-nav-scroll {
    background: rgba(0,0,0,0.3);
}
.demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>
