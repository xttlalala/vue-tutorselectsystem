<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <sidebar id="sidebar" />
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-dark">
          <myheader />
          <router-view id="router" v-bind:key="$route.path" />
        </div>
      </el-col>
    </el-row>
    <!-- <div id="content">
      
    </div> -->
  </div>
</template>

<style scoped>
.container {
  background-color: aliceblue;
  /* background-color: #ffffcc; */
  display: inline-block;
  width: 100%;
}
</style>

<style scoped></style>

<script>
import sidebar from "@/views/Sidebar";
import myheader from "@/views/Header";
export default {
  components: {
    sidebar,
    myheader
  }
};
</script>
