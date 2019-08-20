<template>

  <div id="app">
    <div class="user">
      <!-- <el-header> -->
      <el-menu
        v-if="$route.meta.footShow"
        :default-active="this.$route.path"
        router
        @select="handleSelect"
        mode="horizontal"
      >
        <img src="../public/assets/jhlogin.png" class="login-image"/>
        <el-menu-item
          v-for="(item,i) in navList || []"
          id="topNav"
          :key="i"
          :index="item.name"
        >{{ item.navItem }}
        </el-menu-item>
      </el-menu>
      <!-- <router-view /> -->
      <!-- </el-header> -->
    </div>
    <div class="admin" v-if="$route.meta.footShow1">
      <el-container>
        <el-aside width="200px">
          <img src="../public/assets/jhlogin.png" class="img-login"/>
          <el-menu
            :default-active="this.$route.path"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="navList1[0].link">用户管理</el-menu-item>
                <el-menu-item :index="navList1[1].link">会员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>试题管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="navList1[2].link">增加类别</el-menu-item>
                <el-menu-item :index="navList1[3].link">试题小库</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-platform"></i>
                <span>试卷管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="navList1[4].link">生成试卷</el-menu-item>
                <el-menu-item :index="navList1[5].link">试卷列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <router-view style="width:100%"/>
      </el-container>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>

</template>
<style lang="scss">
  #app {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }

  #img {
    width: 12%;
    height: 12%;
    float: left;
    margin-top: 2%;
    margin-left: 2%;
    margin-right: 2%;
  }

  .el-menu-demo {
    // float: right;
    margin-right: auto;
    margin-left: auto;
  }

  #topNav {
    margin-top: 1%;
    margin-right: 50px;
  }

  .line {
    width: 80%;
    border: 1px solid #ccc;
  }
</style>
<style>
  body {
    margin: 0px;
  }

  .el-menu-item-group__title {
    padding: 0px !important;
  }

  .el-main {
    padding: 0px !important;
  }

  .el-header {
    height: 80px !important;
  }
</style>
<script>
  import HelloWorld from "./components/HelloWorld.vue";

  export default {
    name: "app",
    data() {
      return {
        navList: [
          {name: "/userIndex", navItem: "首页"},
          {name: "/allQuestion", navItem: "试题库"},
          {name: "/paperType", navItem: "试卷库"},
          {name: "/index", navItem: "试卷分析"}
        ],
        navList1: [
          {link: "/userManagement", navName: "首页"},
          {link: "/membershipManagement", navName: "试题库"},
          {link: "/additionalCategories", navName: "首页"},
          {link: "/adminAllQuestion", navName: "试题库"},
          {link: "/paperTypes", navName: "试题库"},
          {link: "/paperLists", navName: "试题库"}
        ]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

    }
  }
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }

  .el-header,
  .el-footer {
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    padding: 0px;
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    padding: 0px;
  }

  .el-menu-item {
    padding-right: 30px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  /*.el-menu--horizontal > .el-menu-item {*/
  /*  float: right;*/
  /*}*/

  /*.el-menu--horizontal > .el-submenu {*/
  /*  float: right;*/
  /*}*/
  .login-image {
    float: left;
    margin: 31px 10px 10px 30px;
  }
</style>
<style scoped>

  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 50px;
  }

  .el-main {
    padding: 0px;
  }

  .el-col-12 {
    width: 100%;
  }

  .img-login {
    margin-top: 35px;
  }
</style>
<style>
  body {
    margin: 0px;
  }

  .el-menu-item-group__title {
    padding: 0px !important;
  }

  .el-main {
    padding: 0px !important;
  }

  .el-header {
    height: 80px !important;
  }
</style>

