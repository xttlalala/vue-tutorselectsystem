<template>
  <div class="container">
    <el-row>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="22">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>研究方向</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">
                编辑信息
              </el-button> -->
            </div>
            <div>
              <el-form ref="form" label-width="100px" class="demo-dynamic">
                <el-form-item
                  v-for="(direction, index) in directions"
                  :label="'研究方向' + (index + 1)"
                  :key="index"
                  :prop="'directions.' + index + '.name'"
                >
                  <el-input v-model="direction.name"></el-input>
                  <el-button
                    type="danger"
                    size="mini"
                    circle
                    icon="el-icon-delete"
                    @click.prevent="removeDirection(direction)"
                    style="margin-left:10px"
                  ></el-button>
                  <!-- <el-button @click.prevent="removeDirection(direction)">
                    删除
                  </el-button> -->
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm"
                    style="background-color: #ccccff; border-color: #ccccff;width:90px"
                  >
                    提交
                  </el-button>
                  <el-button @click="addDirection">
                    新增方向
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { UPDATE_DIRECTIONS } from "@/store/types.js";
export default {
  created() {
    this.$store.dispatch("directionsindex");
    console.log(this.directions);
  },
  computed: {
    ...mapState(["directions"]),
    ...mapState(["isUpdateDirections"])
  },
  methods: {
    submitForm() {
      console.log(this.directions);
      this.$store.dispatch(UPDATE_DIRECTIONS, this.directions).then(() => {
        if (this.isUpdateDirections == true) {
          this.$message({
            message: "修改成功！",
            type: "success"
          });
        }
      });
    },
    removeDirection(item) {
      var index = this.directions.indexOf(item);
      if (index !== -1) {
        this.directions.splice(index, 1);
      }
    },
    addDirection() {
      this.directions.push({
        name: ""
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
