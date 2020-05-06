<template>
  <div class="container">
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>录入学生</span>
              <!-- <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="open2 = true"
              >
                添加课程
              </el-button> -->
            </div>

            <div>
              <el-select
                v-model="value"
                filterable
                placeholder="请选择所在课程"
                style="margin:0px 30px;"
              >
                <el-option
                  v-for="item in tcourses"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <form>
                <input
                  type="file"
                  @change="readFile"
                  style="margin: 30px 0px 0px 30px;"
                />
              </form>
              <br />
              <el-table :data="students" style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="number"
                  label="学号"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="score"
                  label="成绩"
                  width="180"
                ></el-table-column>
              </el-table>
              <el-button
                type="primary"
                style="float: right; margin:10px;"
                @click="buildStudent"
              >
                录入学生
              </el-button>
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
import { readStudentsFile } from "@/utils/ExcelUtils.js";
import { BUILD_STUDENT } from "@/store/types.js";
export default {
  created() {
    this.$store.dispatch("coursesindex");
    console.log(this.tcourses);
  },
  computed: {
    ...mapState(["tcourses"])
  },
  data: () => ({
    students: null,
    student: { user: { number: null } },
    course: { id: null },
    buildStudents: [
      { score: null, student: { user: { number: null } }, course: { id: null } }
    ],
    value: "", //前端传来的课程id
    cid: null
  }),
  methods: {
    readFile(event) {
      let file = event.target.files[0];
      readStudentsFile(file).then(data => {
        this.students = data;
        console.log(this.students[0].name);
        console.log(this.value);
      });
    },
    // buildStudent() {
    //   this.$store.dispatch(BUILD_STUDENT, {
    //     score: this.students[0].score,
    //     student: { user: { number: this.students[0].number } }, //students列表第一个对象的分数和学号
    //     course: { id: this.value } //前端选的课程id
    //   });
    // }
    buildStudent() {
      for (let index = 0; index < this.students.length; index++) {
        var sc = new Object();
        sc.score = this.students[index].score;
        this.student.user.number = this.students[index].number;
        sc.student = this.student;
        this.course.id = this.value;
        sc.course = this.course;
        this.buildStudents.push(sc);
      }
      console.log(this.buildStudents);
      this.$store.dispatch(BUILD_STUDENT, {
        buildStudents: this.buildStudents
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
