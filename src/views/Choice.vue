<template>
  <div class="container">
    <el-row>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>选择导师</span>
            </div>

            <div style="margin:20px;font-size:15px">
              <span>请先选择毕设方向(选择两项以上)：</span>
              <el-checkbox-group
                v-model="checkedDirections"
                style="margin:25px"
              >
                <el-checkbox v-for="d in directions" :label="d" :key="d.id">
                  {{ d.name }}
                </el-checkbox>
              </el-checkbox-group>
            </div>

            <div>
              <div style="margin:40px 0px 10px 20px; font-size:15px">
                请选择您心仪的导师：
              </div>
              <el-table :data="tutors" style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="user.name"
                  label="导师姓名"
                  width="180"
                ></el-table-column>
                <el-table-column label="操作" width="300">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      :disabled="
                        checkedDirections.length < 2 ||
                          scope.row.nowStuNum == scope.row.maxStuNum
                      "
                      @click="handleChoose(scope.$index, scope.row)"
                    >
                      <p v-if="scope.row.nowStuNum == scope.row.maxStuNum">
                        已满
                      </p>
                      <p v-else>选择</p>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { CHOOSE_TUTOR } from "@/store/types.js";
import { ADD_DIRECTION } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("tutorsindex");
    this.$store.dispatch("studentindex");
    this.$store.dispatch("directionsindex");
  },
  computed: {
    ...mapState(["tutors"]),
    ...mapState(["student"]),
    ...mapState(["choose"]),
    ...mapState(["directions"]),
    mydirections() {
      var mydirections = [];
      this.directions.forEach(element => {
        mydirections.push(element.name);
      });
      return mydirections;
    }
  },
  data() {
    return {
      checkedDirections: [],
      isIndeterminate: true
    };
  },

  methods: {
    handleChoose(index, row) {
      console.log(this.checkedDirections);
      // console.log(this.checkedDirections);
      // var datas = [];
      // for (let index = 0; index < this.checkedDirections.length; index++) {
      //   datas.push({
      //     mydirection: this.checkedDirections[index]
      //   });
      // }
      // console.log(datas);
      // this.$store.dispatch("tutorStuNum",{
      //   id:row.id
      // })
      if (this.student.tutor != null || this.choose == 1) {
        this.$message.error("你已经有导师了，不可重复选择");
      } else if (row.nowStuNum == row.maxStuNum) {
        this.$message.error("导师人数已满");
      } else {
        this.$confirm("选择导师后不可随意更改, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch(CHOOSE_TUTOR, {
                id: row.id
              })
              .then(() => {
                if (this.choose == 1) {
                  this.$store.dispatch(ADD_DIRECTION, this.checkedDirections);
                  this.$message({
                    type: "success",
                    message: "选择成功!"
                  });
                }
                if (this.choose == 0) {
                  this.$message.error("抱歉，您的成绩排名不在导师选择的范围内");
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消选择"
            });
          });
        console.log(index + 1);
        console.log(row);
      }
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
