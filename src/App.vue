<template>
  <div id="app">
    <sidebar id="sidebar" />
    <router-view id="router" v-bind:key="$route.path" />
    <alertdialog />
  </div>
</template>

<script>
import sidebar from "@/views/Sidebar";
export default {
  components: {
    sidebar,
    alertdialog: () => import("@/components/AlertDialog.vue")
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  margin-top: 20px;
}
#sidebar {
  width: 300px;
  display: inline-block;
  border: 1px solid red;
  vertical-align: top;
}
#router {
  display: inline-block;
  border: 1px solid red;
}
</style>
