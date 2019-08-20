<template>
  <div>
    <el-container>
      <el-container>
        <el-header style="text-align: right; font-size: 16px">
          <i class="el-icon-user-solid" style="margin-right: 15px;font-size: 20px"></i>
          <span>admin</span>
        </el-header>
        <el-main>
          <div class="main-back">
            <div class="subtitle">增加小分类</div>
            <!-- 添加分类 -->
            <div class="addPart">
              <div class="add">
                <i class="el-icon-edit-outline"></i>
                添加分类
              </div>
              <div class="list">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="分类名称" prop="name">
                    <el-input class="addInput" v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="addSubject('formName')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <!-- 分类列表 -->
            <div class="managePart">
              <div class="manage">
                <i class="el-icon-menu"></i>
                分类管理
              </div>
              <div class="tableList">
                <el-table
                  :data="tableData"
                  align="center"
                  class="classManagement"
                  row-style="height:0"
                  cell-style="padding:0"
                  :default-sort="{prop: 'date', order: 'descending'}"
                >
                  <el-table-column label="编号" type="index" width="280"></el-table-column>
                  <el-table-column label="题目" width="480">
                    <template slot-scope="scope">
                      <div slot="reference">
                        <span
                          size="medium"
                          v-html="scope.row.sortName"
                          style="cursor:pointer;"
                        >{{ scope.row.sortName }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" header-align="center" width="140">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <el-button
                          class="answer"
                          type="text"
                          @click.native="getSortDetail(scope.row)"
                        >修改</el-button>
                        <el-button
                          class="answer"
                          style="color:red;"
                          @click.native="deleteSortData(scope.row)"
                          type="text"
                        >删除</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <!--          修改弹框-->
          <el-dialog title="修改试题类型" :visible.sync="dialogFormVisible1">
            <el-form :model="updateForm">
              <el-form-item label="类型名称" :label-width="formLabelWidth">
                <el-input v-model="updateForm.sortName" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="updateSortDetail">修改</el-button>
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import cdService from "@/apis/service.cd";

export default {
  name: "additionalCategories",
  data() {
    return {
      dialogFormVisible1: false, //修改表单
      formLabelWidth: "130px",
      ruleForm: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入需要添加的分类名称",
            trigger: "blur"
          }
        ]
      },

      updateForm: [
        {
          sortName: ""
        }
      ],
      tableData: [
        {
          sortName: ""
        }
      ]
    };
  },

  mounted() {
    this.getSortData();
    this.getSortDetail();
  },
  created() {},
  methods: {
    //添加分类
    async addSubject(formName) {
      let param = {
        subjectId: this.$route.params.subjectId,
       sortName: this.ruleForm.name
      };
      console.log(this.ruleForm.name, "输入的分类");
      console.log(param, "参数");
      console.log(this.$route.params.subjectId, "添加分类获取的科目id");
      let res = await cdService.addSort(param);
        console.log(res, "分类的res");
      if (res) {
        this.getSortData();
        this.$message({
          type: "success",
          message: "添加成功!"
        });
      }
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 分类管理
    async getSortData() {
      let param = {
        subjectId: this.$route.params.subjectId
      };
      console.log(
        this.$route.params.subjectId + "this.$route.params.subjectId"
      );

      let res = await cdService.getSort(param);
      if (res) {
        this.tableData = res.data;

        console.log(res, "res1111111111111212121");
        console.log(res.totalRecord, "res.data.totalRecord");
      }
      console.log(res.data, "res1111111111111");
    },
    //点击修改
    async getSortDetail(row) {
      let param = {
        sortId: row.sortId
      };

      let res = await cdService.clickUpdSort(param);

      if (res) {
        console.log(res, "题目详情");
        this.updateForm = res.data;
        // this.tableData.sortName = res.data.sortName;
        console.log(res, "修改分类的res");
        console.log(res.data.sortName, "修改分类类型");
      }

      this.dialogFormVisible1 = true;
      console.log(row.sortId, "分类id");
      console.log(res.data, "分类列表");
    },
    // 确认修改
    async updateSortDetail(updateForm) {
      let param = {
        sortId: this.updateForm.sortId,
        sortName: this.updateForm.sortName
      };
      console.log(this.updateForm.subjectId, "确认修改分类的科目id");
      console.log(this.updateForm.sortId, "确认修改分类的id");
      console.log(this.updateForm.sortName, "确认修改分类的name");

      let res = await cdService.updSort(param);
      if (res) {
        this.dialogFormVisible1 = false;
        this.getSortData();

        this.$message({
          type: "success",
          message: "修改成功!"
        });
      }
    },
    //删除科目
    async deleteSortData(sortId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = {
            sortId: sortId.sortId
          };
          let res = await cdService.deleteSort(param);
          if (res) {
            this.$message({
              type: "info",
              message: "删除成功!"
            });
            this.getSortData();
          } else {
            this.$message({
              type: "info",
              message: "删除失败"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
/* 底背景颜色-灰色 */
.el-main {
  background-color: #eff4f9;
  color: #333;
  height: 671px;
}

/* 主背景颜色-白色 */
.main-back {
  width: 98.6%;
  bottom: 0px;
  background: #ffffff;
  margin: 18px 0px 0px 16px;
}
/* 增加类别 */
.subtitle {
  text-align: left;
  padding: 5px;
  margin: 10px;
  font-size: 12px;
  border-bottom: 1px solid #ebebeb;
  color: #a5a5a5;
}
/* 添加分类标题 */
.add {
  width: 70%;
  margin: 0 auto;
  font-size: 18px;
  text-align: left;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  margin-top: 20px;
}
/* 表单 */
.demo-ruleForm {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}
/* 添加输入框 */
.addInput {
  width: 70%;
}
/* 分类管理 */
.manage {
  width: 70%;
  margin: 0 auto;
  font-size: 18px;
  text-align: left;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  margin-top: 60px;
}
.classManagement {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 25px;
}
.name-wrapper {
  text-align: center;
}
.tableList {
  margin-top: 30px;
}
</style>
<style>
.el-form-item__error {
  left: 111px;
}
</style>
