<template>
  <div>
    <div class="title">
      <div class="content">
        <p v-if="tutor">欢迎您！{{ tname }}老师</p>
        <p v-else>欢迎您！{{ sname }}同学</p>
        <el-button
          circle
          type="danger"
          icon="el-icon-switch-button"
          @click="logout"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    if (sessionStorage.getItem("role") == "6983f953b49c88210cb9") {
      // console.log(sessionStorage.getItem("role"));
      this.$store.dispatch("backendindex");
    }
    if (sessionStorage.getItem("role") == "bb63e5f7e0f2ffae845c") {
      console.log(sessionStorage.getItem("role"));
      this.$store.dispatch("studentindex");
    }
  },
  computed: {
    ...mapState(["tutor"]),
    ...mapState(["student"]),
    tname() {
      if (this.tutor != null) {
        return this.tutor.user.name;
      } else {
        return null;
      }
    },
    sname() {
      if (this.student != null) {
        return this.student.user.name;
      } else {
        return null;
      }
    }
  },
  methods: {
    logout() {
      sessionStorage.clear();
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.title {
  margin: 0px 0px 0px 10px;
  border-radius: 10px;
  background-color: #99cccc;
  color: white;
  width: 99%;
  height: 75px;
  padding: 20px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.content {
  text-align: right;
  float: right;
  display: flex;
}
.content > .el-button {
  margin-left: 20px;
}
.content p {
  margin-top: 10px;
}
</style>
