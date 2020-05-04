<template>
  <div id="app">
    <!-- <router-view id="router" v-bind:key="$route.path" /> -->
    <index v-if="isLogin" />
    <login v-else />
    <alertdialog />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    alertdialog: () => import("@/components/AlertDialog.vue"),
    login: () => import("@/views/Login.vue"),
    // welcome: () => import("@/views/Welcome.vue")
    index: () => import("@/views/Index.vue")
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#router {
  display: inline-block;
}

#app {
  width: 100%;
  height: 900px;
}
</style>
