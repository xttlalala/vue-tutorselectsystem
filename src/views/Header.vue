<template>
  <div>
    <div class="title">
      <p v-if="tutor">欢迎您！{{ tutor.user.name }}老师</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    if (sessionStorage.getItem("role") == "6983f953b49c88210cb9")
      // console.log(sessionStorage.getItem("role"));
      this.$store.dispatch("backendindex");
  },
  computed: {
    ...mapState(["tutor"])
  }
};
</script>

<style scoped>
.title {
  background-color: #545c64;
  color: white;
  width: 100%;
  height: 70px;
  padding: 20px;
  text-align: right;
}
</style>
