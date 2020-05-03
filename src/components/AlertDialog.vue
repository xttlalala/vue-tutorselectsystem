<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  watch: {
    exp() {
      alert(`${this.exp.message}`);
    }
  },
  computed: {
    ...mapState({ exp: state => state.exception })
    //mapState与vuex中State绑定，但这次在内部自己声明计算属性exp。
    //为什么还声明一个？因为要操作state.exception
    //watch监听exp,有变化弹出alert
  }
};
</script>
