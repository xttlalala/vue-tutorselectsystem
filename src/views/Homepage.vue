<template>
  <div class="container">
    <div class="basic-note" v-if="tutor">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple"><h3>基本信息</h3></div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button @click="open1 = true" type="primary" plain>
              修改密码
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="修改密码" :visible.sync="open1">
        <el-form>
          <el-form-item label="输入新密码" :label-width="formLabelWidth">
            <el-input
              type="password"
              v-model="password0"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" :label-width="formLabelWidth">
            <el-input
              type="password"
              v-model="password1"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="open1 = false">取 消</el-button>
          <el-button type="primary" @click="updatePwd">
            确 定
          </el-button>
        </div>
      </el-dialog>
      <div>姓名: {{ tutor.user.name }}</div>
      <div>工号：{{ tutor.user.number }}</div>
    </div>
    <div class="basic-note" v-else>我的学生</div>
    <div class="add-note" v-if="tutor">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple"><h3>招收信息</h3></div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary" plain>编辑信息</el-button>
          </div>
        </el-col>
      </el-row>
      <div>目前学生数: {{ tutor.nowStuNum }}</div>
      <div>最大学生数：{{ tutor.maxStuNum }}</div>
      <div>招收学生范围：成绩排名在1-{{ tutor.scopeStuNum }}之间</div>
    </div>
    <div class="add-note" v-else>我的学生</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { UPDATE_PWD } from "@/store/types.js";
export default {
  created() {
    if (sessionStorage.getItem("role") == "6983f953b49c88210cb9")
      this.$store.dispatch("backendindex");
  },
  data() {
    return {
      open1: false,
      formLabelWidth: "120px",
      number: null,
      password0: null,
      password1: null
    };
  },
  methods: {
    updatePwd() {
      if (this.password0 == this.password1) {
        this.$store.dispatch(UPDATE_PWD, {
          password: this.password0
        });
        this.open1 = false;
      } else {
        console.log("两次密码不一致");
      }
    }
  },
  computed: {
    ...mapState(["tutor"])
  }
};
</script>

<style scoped>
h3 {
  padding: 3px 0px;
  font-size: 20px;
}
.basic-note {
  margin: 50px;
  padding: 50px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
}
.basic-note div {
  padding-bottom: 1px;
  font-size: 16px;
}
.basic-note > div {
  padding-bottom: 8px;
  font-size: 16px;
}

.add-note {
  margin: 50px;
  padding: 50px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
}
.add-note div {
  padding-bottom: 1px;
  font-size: 16px;
}
.add-note > div {
  padding-bottom: 8px;
  font-size: 16px;
}
</style>
