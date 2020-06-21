<template>
  <div class="container">
    <el-row>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light button-container">
          <el-button
            @click="changeItem2"
            icon="el-icon-s-goods
"
          >
            我的学生
          </el-button>
          <el-button @click="changeItem1" icon="el-icon-user-solid">
            自选学生
          </el-button>
        </div>
      </el-col>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :hidden="flag != 1">
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
              @click="addstudent"
              style="float:right;margin:0px 10px 20px 0px;background-color: #ccccff; border-color: #ccccff"
            >
              添加学生
            </el-button>
          </el-card>
        </div>
      </el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :hidden="flag != 2">
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="22">
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
              <el-table-column
                prop="mydirection"
                label="毕设方向"
                width="280"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    icon="el-icon-edit"
                    circle
                    @click="handleEdit(scope.$index, scope.row)"
                    style="background-color: #ccccff;"
                  ></el-button>
                  <!-- <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                  >
                    <i class="el-icon-edit"></i>
                  </el-button> -->
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="handleDelete(scope.$index, scope.row)"
                  ></el-button>
                  <!-- <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >
                    <i class="el-icon-delete"></i>
                  </el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="修改毕设方向" :visible.sync="open1">
              <el-form>
                <el-form-item label="毕设方向" :label-width="formLabelWidth">
                  <el-input
                    type="text"
                    v-model="dir"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="open1 = false">取 消</el-button>
                <el-button type="primary" @click="updateSdir">
                  确 定
                </el-button>
              </div>
            </el-dialog>
          </el-card>
        </div>
      </el-col>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ADD_STUDENT } from "@/store/types.js";
import { UPDATE_SDIR } from "@/store/types.js";
import { DELETE_RELATION } from "@/store/types.js";
export default {
  created() {
    this.$store.dispatch("mystudentsindex");
    console.log(this.mystudents);
  },
  computed: {
    ...mapState(["tutor"]),
    ...mapState(["mystudents"])
  },
  data: () => ({
    //表单
    labelPosition: "right",
    name: "",
    number: "",
    open1: false,
    formLabelWidth: "120px",
    updateItemRow: null,
    dir: null,
    flag: 2
  }),
  methods: {
    changeItem1() {
      this.flag = 1;
    },
    changeItem2() {
      this.flag = 2;
    },
    addstudent() {
      console.log(this.name);
      console.log(this.number);
      if (this.mystudents.length == this.tutor.maxStuNum) {
        this.$message.error("您已完成招生目标，不能继续添加。");
      } else {
        this.$store
          .dispatch(ADD_STUDENT, {
            user: {
              name: this.name,
              number: this.number
            }
          })
          .then(() => {
            this.$message({
              message: "恭喜你，成功添加该学生 ",
              type: "success"
            });
          })
          .catch(() => {
            this.$message.error("该学生已有导师，不可重复添加");
          });
      }
    },
    success() {
      this.$message({
        message: "操作成功",
        type: "success"
      });
    },
    handleEdit(index, row) {
      this.updateItemRow = row;
      console.log(index + 1, row);
      this.dir = row.mydirection;
      this.open1 = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久取消您与该学生的关联, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch(DELETE_RELATION, {
            id: row.id
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(index + 1);
      console.log(row);
    },
    updateSdir() {
      this.$store
        .dispatch(UPDATE_SDIR, {
          id: this.updateItemRow.id,
          mydirection: this.dir
        })
        .then(() => {
          this.open1 = false;
          this.success();
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  padding-top: 30px;
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
.button-container > .el-button {
  font-size: 15px;
  background-color: #ccccff;
  color: #5fa1a1;
  width: 150px;
  height: 70px;
  border-radius: 40px;
  margin-right: 10px;
}
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
