<template>
  <div class="container">
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>我的课程</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">
                编辑信息
              </el-button> -->
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
          </el-card>
        </div>
      </el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("coursesindex");
    console.log(this.tcourses);
  },
  computed: {
    ...mapState(["tcourses"])
  },
  methods: {
    handleEdit(index, row) {
      console.log(index + 1, row);
    },
    handleDelete(index, row) {
      console.log(index + 1);
      console.log(row);
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
