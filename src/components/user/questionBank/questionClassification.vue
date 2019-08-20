<template>
  <div class="classification">
    <div class="add">试题分类<span> <el-button type="text" @click="dialogFormVisible = true">+</el-button></span></div>
    <div class="list">
      <el-row>
        <el-col :span="8" v-for="cardList in cardLists || []">
          <el-card :body-style="{ padding: '0px'}">
            <div class="img-background" :style="{'background':cardList.background}">
              <img :src="cardList.pic" class="image">
            </div>
            <div style="padding: 15px;">
              <span>{{cardList.title}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="增加试题类型" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类型名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图标" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">添加</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "questClassification",
    data() {
      return {
        imageUrl: '',
        dialogFormVisible: false,
        form: {
          name: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        cardLists: [
          {pic: '/assets/javafill.png', title: 'Java面试题', background: '#0099FF'},
          {pic: '/assets/vue.png', title: 'Vue面试题', background: '#00CC99'},
          {pic: '/assets/javaScript.png', title: 'javaScript面试题', background: '#FF9966'},
          {pic: '/assets/linux.png', title: 'Linux面试题', background: '#CC66FF'},
          {pic: '/assets/javafill.png', title: 'Java面试题', background: '#0099FF'},
          {pic: '/assets/vue.png', title: 'Vue面试题', background: '#00CC99'},
          {pic: '/assets/javaScript.png', title: 'javaScript面试题', background: '#FF9966'},
          {pic: '/assets/linux.png', title: 'Linux面试题', background: '#CC66FF'}
        ],

      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>

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
    clear: both
  }

  .image {
    width: 35%;
    height: 37%;
    display: block;

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
    margin-left: 40px;
  }

  .add {
    margin: 40px;
    font-size: 20px;
  }

  .add span {
    float: right;
  }

  .el-card {
    margin-bottom: 40px;
  }

  .add span .el-button {
    font-size: 35px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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

</style>
<style>
  .el-input__inner {
    margin-top: 0px !important;
  }

  .el-upload {
    border: 1px solid #e0e0e0 !important;
  }
</style>
