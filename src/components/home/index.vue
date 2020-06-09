<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../assets/logo.png" alt style="height:60px;" />
        <span>房地产管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出登录</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="el-aside">
        <div class="toggle-button" @click="toggleCollapse">|||</div>

        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="rgba(49,55,67)"
          text-color="#fff"
          active-text-color="rgb(64,158,255)"
          unique-opened
          :collapse= "isCollapse"
          :collapse-transition= "false"
          router
          :default-active= "activePath"
        >
        <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index= "'/' + subItem.path" v-for="subItem in item.children"
             :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot= "title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <!-- 右侧内容体 -->
      <el-main>
        <!-- 路由站位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      // 传入icon
      iconsObj: {
        '125': 'el-icon-user',
        '103': 'el-icon-lock',
        '101': 'el-icon-shopping-bag-1',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-platform',
        '150': 'el-icon-setting'
      },
      //菜单是否折叠的属性
      isCollapse: false ,
      // 被激活的链接地址
      activePath:''
    };
  },
  created(){
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      // 销毁token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的菜单项
    async getMenuList(){
      const {data: res} = await this.$http.get('menus');
      if(res.meta.status !== 200)
        return this.$message.error(res.meta.msg)
      this.menulist = res.data;
      console.log(res)
    },
    // 点击按钮切换 菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = ! this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  }
};
</script>

<style lang = "less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: rgb(54, 61, 64);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 15px;
  }
}
.el-aside {
  background-color: rgb(49, 55, 67);
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: rgb(233, 237, 241);
}

.toggle-button {
  background-color: rgb(71,81,98);
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

/* 自己写的侧边栏过渡效果 */
.el-aside {
  transition: width 70ms linear;
  /* 自定属性 */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>