<template>
  <div>
    <h1>跨域发出登录请求</h1>
    <p>
      前端在入口取消mock引入，停止mock数据；
      启动后端springboot-examples；后端添加cors跨域过滤器。
      <br />
      后端默认用户名/密码：1001，1001
    </p>
    <form ref="form">
      <label>用户名</label>
      <input type="text" v-model="number" />
      <br />
      <label>密码</label>
      <input type="password" v-model="password" />
      <br />
      <button @click="login" type="button">登录</button>
    </form>
  </div>
</template>
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
