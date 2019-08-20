<template>
  <div>
    <el-container>
      <el-container>
        <el-header style="text-align: right; font-size: 16px">
          <i class="el-icon-user-solid" style="margin-right: 15px;font-size: 20px"></i>

          <span>用户名</span>
        </el-header>
        <el-main>
          <div class="main-back">
            <div class="subtitle">增加类别</div>
            <div class="add">
              试题分类
              <span>
                <el-button class="add-but" type="text" @click="dialogFormVisible = true">添加</el-button>
              </span>
            </div>

            <div class="list">
              <el-row>
                <el-col :span="8" v-for="item in subjectList" :key="item">
                  <el-card :body-style="{ padding: '0px'}" style="cursor:pointer">
                    <div class="img-background" :style="{'background':item.picBackground}">
                      <img :src="item.subjectPic" class="image" />
                      <div class="icon-subject">
                        <i class="el-icon-edit" @click="updateSubject(item.subjectId)"></i>
                        <i class="el-icon-delete" @click="delSubject(item.subjectId)"></i>
                      </div>
                    </div>
                    <div style="padding: 15px;" @click="addSort(item.subjectId)">
                      <span>{{item.subjectName}}</span>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>

          <!--添加弹框-->
          <el-dialog title="增加试题类型" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="类型名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="上传图标" :label-width="formLabelWidth">
                <el-upload
                  v-model="form.picurl"
                  class="avatar-uploader"
                  action="http://192.168.1.199:8080/upload/image"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="picurl" :src="picurl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addSubject">添加</el-button>
            </div>
          </el-dialog>

          <!--          修改弹框-->
          <el-dialog title="修改试题类型" :visible.sync="dialogFormVisible1">
            <el-form :model="updateForm">
              <el-form-item label="类型名称" :label-width="formLabelWidth">
                <el-input v-model="updateForm.subjectName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="上传图标" :label-width="formLabelWidth">
                <el-upload
                  v-model="updateForm.subjectPic"
                  class="avatar-uploader"
                  action="http://192.168.1.199:8080/upload/image"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="picurl" :src="picurl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="updateSubjectDetail">修改</el-button>
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
      active: "",
      imageUrl: "",
      picurl: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      updateForm: {
        subjectId: "",
        picBackground: "",
        subjectPic: "",
        subjectName: ""
      },
      form: {
        name: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      subjectList: [
        {
          picBackground: "",
          subjectPic: "",
          subjectName: "",
          subjectId: ""
        }
      ],
      formLabelWidth: "130px"
    };
  },

  mounted() {
    this.getSubjects();
    // this.addSubject();
  },
  methods: {
    //删除科目
    async delSubject(subjectId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = {
            subjectId: subjectId
          };
          let res = await cdService.deleteSubject(param);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getSubjects();
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
    },
    //点击修改科目
    async updateSubject(subjectId) {
      this.dialogFormVisible1 = true;
      let param = {
        subjectId: subjectId
      };
      console.log(subjectId, "获取科目id");
      let res = await cdService.SubjectDetail(param);
      if (res) {
        console.log(res.data, "根据id获取科目详情");
        this.updateForm = res.data;
      }
    },
    //提交修改科目
    async updateSubjectDetail() {
      let param = {
        subjectId: this.updateForm.subjectId,
        subjectName: this.updateForm.subjectName,
        subjectPic: this.updateForm.subjectPic
      };
      let res = await cdService.updSubject(param);
      if (res) {
        this.dialogFormVisible1 = false;
        this.getSubjects();

        this.$message({
          type: "success",
          message: "修改成功!"
        });
      }
    },
    //获取图片地址
    handleSuccess(res, file) {
      if (res.code) {
        this.picurl = res.data;
        console.log(this.picurl, "获取图片地址");
      }
    },
    // 获取科目
    async getSubjects() {
      let res = await cdService.getAllSubject();
      this.subjectList = res.data;
      console.log(this.subjectList, "获取所有科目");
    },
    //增加科目
    async addSubject() {
      let param = {
        subjectName: this.form.name,
        subjectPic: this.picurl
      };
      let res = await cdService.addSubject(param);
      if (res.code === 200) {
        console.log(res, "增加科目成功");
        this.dialogFormVisible = false;
        this.getSubjects();
        this.$message({
          type: "success",
          message: "添加成功!"
        });
      }
    },
    //增加小分类
    addSort(subjectId) {
      this.$router.push({
        name: "addClassification",
        params: { subjectId: subjectId }
      });
      console.log("subjectId:", subjectId);
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: right;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #eff4f9;
  color: #333;
  height: 671px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-col-12 {
  width: 100%;
}

.img-login {
  margin-top: 35px;
}

.main-back {
  width: 98.6%;
  bottom: 0px;
  background: #ffffff;
  margin: 18px 0px 0px 16px;
}

.subtitle {
  text-align: left;
  padding: 5px;
  margin: 10px;
  font-size: 12px;
  border-bottom: 1px solid #ebebeb;
  color: #a5a5a5;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.image {
  width: 35%;
  height: 37%;
  display: block;
  margin: 20% 0% 20% 20%;
}

.img-background {
  width: 100%;
  height: 150px;
  background: #249994;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-col-8 {
  width: 13.6%;
  margin-left: 36px;
}

.add {
  margin: 20px;
  font-size: 14px;
  text-align: left;
}

.add span {
  float: right;
}

.add-but {
  margin-top: -20px;
  font-size: 15px;
  margin-right: 10px;
}

.el-card {
  margin-bottom: 40px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-dialog__wrapper {
  width: 1200px;
}

.add-tk {
  padding: 33px 77px;
}

.icon-subject {
  position: relative;
  left: 5%;
  top: -38%;
  color: #e8e8e8;
}

.el-icon-edit {
  margin-right: 10px;
}

.el-icon-edit:hover,
.el-icon-delete:hover {
  color: #3b3d40;
}
</style>
<style>
.el-menu-item-group__title {
  padding: 0px !important;
}

.el-header {
  height: 80px !important;
  border-bottom: 1px solid #d6dfef;
}

.el-input__inner {
  margin-top: 0px !important;
}

.el-upload {
  border: 1px solid #e0e0e0 !important;
}
</style>

