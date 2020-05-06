<template>
  <div class="container">
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>我的课程</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="open2 = true"
              >
                添加课程
              </el-button>
            </div>

            <div>
              <el-table :data="tcourses" style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="课程名"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="weight"
                  label="比重(%)"
                  width="180"
                ></el-table-column>
                <el-table-column label="操作" width="300">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                    >
                      编辑
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <el-dialog title="添加课程" :visible.sync="open2">
              <el-form>
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                  <el-input
                    type="text"
                    v-model="name"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="课程比重" :label-width="formLabelWidth">
                  <el-input
                    type="text"
                    v-model="weight"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="open2 = false">取 消</el-button>
                <el-button type="primary" @click="addCourse">
                  确 定
                </el-button>
              </div>
            </el-dialog>

            <el-dialog title="修改课程信息" :visible.sync="open1">
              <el-form>
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                  <el-input
                    type="text"
                    v-model="name0"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="课程比重" :label-width="formLabelWidth">
                  <el-input
                    type="text"
                    v-model="weight0"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="open1 = false">取 消</el-button>
                <el-button type="primary" @click="updateCourse">
                  确 定
                </el-button>
              </div>
            </el-dialog>
          </el-card>
        </div>
      </el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { DELETE_COURSE } from "@/store/types.js";
import { ADD_COURSE } from "@/store/types.js";
import { UPDATE_COURSE } from "@/store/types.js";
export default {
  created() {
    this.$store.dispatch("coursesindex");
    console.log(this.tcourses);
  },
  data: () => ({
    open1: false,
    open2: false,
    formLabelWidth: "120px",
    name: null,
    weight: null,
    name0: null,
    weight0: null,
    updateItemRow: null
  }),
  computed: {
    ...mapState(["tcourses"])
  },
  methods: {
    handleEdit(index, row) {
      this.updateItemRow = row;
      console.log(index + 1, row);
      this.open1 = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该课程及选该课的学生, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch(DELETE_COURSE, {
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
    success() {
      this.$message({
        message: "操作成功",
        type: "success"
      });
    },
    addCourse() {
      this.$store.dispatch(ADD_COURSE, {
        name: this.name,
        weight: this.weight
      });
      this.open2 = false;
      this.success();
    },
    updateCourse() {
      this.$store.dispatch(UPDATE_COURSE, {
        id: this.updateItemRow.id,
        name: this.name0,
        weight: this.weight0
      });
      this.open1 = false;
      this.success();
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
