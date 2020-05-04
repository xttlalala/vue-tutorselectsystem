<template>
  <div style="width:100%">
    <!-- <ul>
      <li><router-link to="/homepage">首页</router-link></li>
    </ul> -->

    <!-- <el-row class="tac">
      <el-col :span="24"> -->
    <h2>导航栏</h2>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- default-active 当前激活菜单的 index -->
      <el-menu-item index="1" route="/homepage">
        <i class="el-icon-menu"></i>
        <span slot="title">我的信息</span>
      </el-menu-item>
      <el-menu-item index="2" route="/students">
        <i class="el-icon-menu"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item index="3" route="/courses">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
    </el-menu>
    <!-- </el-col>
    </el-row> -->
  </div>
</template>

<style scoped>
h2 {
  color: cadetblue;
  background-color: #545c64;
  padding: 25px;
}
.el-menu {
  height: 800px;
}
</style>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
