<template>
  <div id="app">
    <router-view/>

    <div class="tab">
      <ul>
        <li v-for="(item,index) in dataList" @touchend="move(item.path,index)" :key="index">
          <div class="tab-scale flexCenter">
            <div class="flexCenter">
              <img :src="index===num?item.pathPicAct:item.pathPic" alt>
            </div>
            <span class="flexCenter">{{item.title}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      num: 0,
      dataList: [
        {
          path: "/",
          title: "首页",
          iconClass: "icon-home1",
          pathPic: require(`@/sites/${
            process.env.siteId
          }/images/mdt_nav_iocn_01.png`),
          pathPicAct: require(`@/sites/${
            process.env.siteId
          }/images/mdt_nav_iocn_01_in.png`)
        },
        {
          path: "/discount",
          title: "优惠",
          iconClass: "icon-weibiaoti-",
          pathPic: require(`@/sites/${
            process.env.siteId
          }/images/mdt_nav_iocn_02.png`),
          pathPicAct: require(`@/sites/${
            process.env.siteId
          }/images/mdt_nav_iocn_02_in.png`)
        },
        {
          path: "/service",
          title: "客服",
          iconClass: "icon-kefu footer-kefu",
          pathPic: require(`@/sites/${
            process.env.siteId
          }/images/mdt_nav_iocn_04.png`),
          pathPicAct: require(`@/sites/${
            process.env.siteId
          }/images/mdt_nav_iocn_04_in.png`)
        },
        {
          path: "/person",
          title: "个人",
          iconClass: "icon-people",
          pathPic: require(`@/sites/${
            process.env.siteId
          }/images/mdt_nav_iocn_05.png`),
          pathPicAct: require(`@/sites/${
            process.env.siteId
          }/images/mdt_nav_iocn_05_in.png`)
        }
      ]
    };
  },
  methods: {
    move(path, i) {
      this.num = i;
      this.$router.push(path);
    }
  },
  created() {
    // 获取各站对应的样式
    require("@/sites/" + process.env.siteId + "/css/tab.scss");
  }
};
</script>

<style lang="scss" scoped>
</style>
