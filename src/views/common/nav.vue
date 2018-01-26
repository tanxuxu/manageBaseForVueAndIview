<template lang="html">
  <div class="nav-box">
    <ul>
      <li @click="gotoLink(item.node)"  @mouseover.stop="overShow($event)" @mouseout.stop="outHide($event)" v-for="(item,index) in menu" >
        <div class="li_c">
          <h2 >{{item.node.name}}</h2>
        </div>
        <!-- 在有子节点时出现 -->
        <div class="childBox" v-if="item.childNodes&&item.childNodes.length>0">
          <!-- 有二级菜单和三级菜单 -->
          <div class="child_item no-child" v-for="(aa,index) in item.childNodes">
            <!-- 装饰点 -->
            <i class="line line_l_t"></i>
            <i class="line line_l_b"></i>
            <i class="line line_r_t"></i>
            <i class="line line_r_b"></i>
            <!-- 二级菜单 -->
            <div class="child_item_c">
              <div class="child_item_l">
                <a href="javascript:void(0)" @click="gotoLink(aa.node)">
                  <img v-bind:src="getIco(aa.node.img)" alt="">
                  <p>{{aa.node.name}}</p>
                </a>
              </div>
              <!-- 三级菜单 -->
              <div class="child_item_r" v-if="aa.childNodes&&aa.childNodes.length>0">
                <a href="javascript:void(0)" v-for="(bb,index) in aa.childNodes" @click="gotoLink(bb.node)" @mouseover="moveInImg($event)" @mouseout="moveOutImg($event)">
                  <img v-bind:src="getIco(bb.node.img)" alt="" class="normal_ico">
                  <img v-bind:src="getIco(bb.node.img2)" alt="" class="current_ico">
                  <p>{{bb.node.name}}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <iframe :src="crimUrl" width="200" height="200" style="display:none;" id="crimIframe"></iframe>
  </div>
</template>

<script>
import util from "../../libs/util.js";
import env from "../../config/env";
import bk_ico from "../../img/menu/bk_ico.png";
export default {
  data() {
    return {
      ico: {
        bk_ico
      },
      menu: window.G.menu,
      crimUrl: ""
    }
  },
  mounted() {

  },
  methods: {
    getIco: function(val) {
      let data = this.ico;
      let item = "";
      for (let i in data) {
        if (i == val) {
          item = data[i];
          break;
        }
      }
      return item;
    },
    //连接跳转
    gotoLink: function(node) {
      debugger;
      let url = node.path;
      let type = node.target;
      let _this = this;
      //外部跳转
      if (type == '_blank') {
        if (url != "" && url != null) {
          window.open(url);
        }
      } else { //打开标签页的方式
        if (url == '') {
          return false;
        }
        //内部标签页
        let menuObj = {
          name: node.name,
          isOpen: true,
          url: url,
          showLoading: true, //显示loading
          iframeId: util.getRandomId()
        }
        let tabData = this.$store.state.tabData;
        let isIn = false;
        for (let i = 0; i < tabData.length; i++) {
          if (tabData[i].name == node.name) { //搜索过
            isIn = true; //存在
            tabData[i].isOpen = true; //存在直接显示
            this.$store.state.currentTabName = tabData[i].name;
          }
        }
        if (!isIn) {
          this.$store.state.tabData.push(menuObj);
          this.$store.state.currentTabName = node.name;
          //处理iframe的内容加载完后将loading取消
          this.$nextTick(function() {
            let currentIframe = $('#' + node.name);
            let tabData = this.$store.state.tabData;
            currentIframe.on('load', function() {
              for (let i = 0; i < tabData.length; i++) {
                if (tabData[i].name == node.name) {
                  tabData[i].showLoading = false;
                  break;
                }
              }
            })
          });
        }
      }
      //关闭所有的下来菜单
      $('.childBox').slideUp(100);
    },
    overShow: function(e) {
      $(e.target).parents('li').children('.childBox').stop().slideDown(100);
    },
    outHide: function(e) {
      $(e.target).parents('li').children('.childBox').stop().slideUp(100);
    },
    moveInImg: function(e) {
      if ($(e.target).parent('a').is('a')) {
        $(e.target).parent('a').addClass('current');
      }
    },
    moveOutImg: function(e) {
      if ($(e.target).parent('a').is('a')) {
        $(e.target).parent('a').removeClass('current');
      }
    }
  }
}
</script>

<style lang="less" scoped="true">
.nav-box {
    height: 36px;
    padding-left: 40px;
}
.nav-box ul li {
    float: left;
    height: 34px;
    line-height: 34px;
    z-index: 999;
    position: relative;
    cursor: pointer;
}
.nav-box ul li .li_c {
    transform: skew(-30deg,0deg);
    width: 100%;
    padding: 0 20px;
    color: #fff;
    background: url("../../img/nav_li_05.png") no-repeat;
    transition: all 0.5s;
    background-size: auto 100%;
}
.nav-box ul li.current .li_c,
.nav-box ul li:hover .li_c {
    background: url("../../img/nav_li_03.png") no-repeat;
    position: relative;
    background-size: auto 100%;
}
.nav-box ul li h2 {
    transform: skew(30deg,0deg);
    font-size: 14px;
    font-weight: normal;
    position: relative;
    z-index: 3;
}
// 菜单
.childBox {
    background: #f00;
    position: absolute;
    left: -10px;
    top: 37px;
    padding: 12px 5px;
    display: none;
    height: auto;
    // width: 570px;
    width: max-content;
    padding-bottom: 0;
    background: linear-gradient(to right,#032148, #0A1A31);
    box-shadow: 0 0 27px #09396F inset;
}
.childBox .child_item:last-child {
    margin-bottom: 10px;
}
.child_item.no-child {
    display: inline-block;
    width: 66px;
    .child_item_l {
        border-right: 0;
    }
}
.child_item .line {
    background: #0072FF;
    position: absolute;
    display: inline-block;
}
.child_item .line_l_t {
    width: 10px;
    height: 1px;
    left: 0;
    top: 0;
    &:before {
        position: absolute;
        content: "";
        width: 1px;
        height: 10px;
        left: 0;
        top: 0;
        background: #0072FF;
    }
}
.child_item .line_l_b {
    width: 10px;
    height: 1px;
    left: 0;
    bottom: 0;
    &:before {
        position: absolute;
        content: "";
        width: 1px;
        height: 10px;
        left: 0;
        bottom: 0;
        background: #0072FF;
    }
}
.child_item .line_r_t {
    width: 10px;
    height: 1px;
    right: 0;
    top: 0;
    &:before {
        position: absolute;
        content: "";
        width: 1px;
        height: 10px;
        right: 0;
        top: 0;
        background: #0072FF;
    }
}
.child_item .line_r_b {
    width: 10px;
    height: 1px;
    right: 0;
    bottom: 0;
    &:before {
        position: absolute;
        content: "";
        width: 1px;
        height: 10px;
        right: 0;
        bottom: 0;
        background: #0072FF;
    }
}
.child_item_c {
    overflow: hidden;
    line-height: 0;
}
.child_item_c img {
    display: block;
}
.child_item_c a {
    display: inline-block;
}
.child_item_c p {
    line-height: initial;
    word-break: break-all;
    white-space: normal;
    text-align: center;
    padding-top: 3px;
}
.child_item_l {
    width: 66px;
    text-align: center;
    float: left;
}
.child_item_r {
    width: 494px;
    float: left;
    vertical-align: top;
    padding-bottom: 5px;
    border-left: 1px solid rgb(3, 69, 115);
    .normal_ico {
        display: block;
        margin: 0 auto;
    }
    .current_ico {
        display: none;
        margin: 0 auto;
    }
    a {
        margin: 5px;
        display: inline-block;
        vertical-align: text-top;
        width: 60px;
        text-align: center;
        p {
            color: #fff;
        }
    }
}
.child_item_r a.current {
    img.normal_ico {
        display: none;
        margin: 0 auto;
    }
    img.current_ico {
        display: block;
        margin: 0 auto;
    }
    p {
        color: #009CE3;
    }
}
</style>
