<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="grid-content bg-purple title">
          <h1>Welcome To</h1>
          <h1>学生导师互选系统</h1>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple title"></div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple-light login-input">
          <form ref="form">
            <label>用户名</label>
            <el-input type="text" v-model="number"></el-input>
            <br />
            <label>密码</label>
            <el-input type="password" v-model="password"></el-input>
            <br />
            <el-button @click="login" type="primary">登录</el-button>
          </form>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple title"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple add-div"></div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  background-image: url("../image/login.png");
}
.el-col {
  padding-top: 150px;
}
.title {
  margin-top: 80px;
  text-align: center;
  font-size: 30px;
}
.login-input {
  padding: 50px 50px 150px 50px;
  background-color: aliceblue;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* text-align: center; */
}
h1 {
  color: aliceblue;
}
.el-input {
  margin-bottom: 20px;
}
.el-button {
  margin: 10px 0px;
  float: right;
}
.add-div {
  background-color: darkgrey;
  /* background-color: gray; */
  border-radius: 10px;
  height: 240px;
  opacity: 0.9;
}
</style>

<script>
import { LOGIN } from "@/store/types.js";
export default {
  data: () => ({
    number: null,
    password: null
  }),
  methods: {
    login() {
      this.$store.dispatch(LOGIN, {
        number: this.number,
        password: this.password
      });
      this.$refs.form.reset();
    }
  }
};
</script>
