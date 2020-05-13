<template>
  <div>
    <div class="title">
      <p v-if="tutor">欢迎您！{{ tname }}老师</p>
      <p v-else>欢迎您！{{ sname }}同学</p>
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
  height: 70px;
  padding: 20px 40px;
  text-align: right;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
