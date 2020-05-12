<template>
  <div class="container">
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>自选学生</span>
            </div>
            <el-form :label-position="labelPosition" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="name"></el-input>
              </el-form-item>
              <el-form-item label="学号">
                <el-input v-model="number"></el-input>
              </el-form-item>
            </el-form>
            <el-button
              type="primary"
              plain
              @click="addstudent"
              style="float:right;margin:0px 10px 20px 0px;"
            >
              添加学生
            </el-button>
          </el-card>
        </div>
      </el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>我的学生</span>
            </div>
            <el-table :data="mystudents" stripe style="width: 100%">
              <el-table-column
                label="序号"
                type="index"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="user.number"
                label="学号"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="user.name"
                label="姓名"
                width="180"
              ></el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ADD_STUDENT } from "@/store/types.js";
export default {
  created() {
    this.$store.dispatch("mystudentsindex");
    console.log(this.mystudents);
  },
  computed: {
    ...mapState(["gotStudent"]),
    ...mapState(["mystudents"])
  },
  data: () => ({
    //表单
    labelPosition: "right",
    name: "",
    number: ""
  }),
  methods: {
    addstudent() {
      console.log(this.name);
      console.log(this.number);
      this.$store
        .dispatch(ADD_STUDENT, {
          user: {
            name: this.name,
            number: this.number
          }
        })
        .then(() => {
          console.log(this.gotStudent);
          this.$message({
            message: "恭喜你，这是一条成功消息" + this.gotStudent.user.name,
            type: "success"
          });
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  padding-top: 50px;
}
.el-table {
  margin: 0px 30px;
}
/* 卡片 */
.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
/* 卡片 */

/* 选课列表 */
.el-input {
  width: 80%;
}

/* 布局css */
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/* 布局css */
</style>
