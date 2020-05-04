<template>
  <div>
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
</template>
