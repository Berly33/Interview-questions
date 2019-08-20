<template>
    <div class="login">
      <div class="title">{{title}}</div>
      <div class="loginBorder">
        <div class="admin">{{admin}}</div>
        <el-container>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="num">
              <el-input v-model="ruleForm.num"></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="pass">
              <el-input type="password" @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @keyup.enter.native="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-container>
      </div>

    </div>
</template>

<script>
  import cdService from "@/apis/service.cd";
    export default {
        name: "login",
      data(){

          return{
            ruleForm: {
              pass: '',
              num: ''
            },
            rules: {
              pass: [

              ],
              num: [

              ]
            },
            title:"金 合 在 线 面 试 题 系 统",
            admin:"管理员登录"
          }
      },
      methods: {
        toAdmin(){
          this.$router.push({
          name: "userManagement",
        });
        },
          //登录
        async submitForm() {
          let param = {
            userName:this.ruleForm.num,
            userPwd: this.ruleForm.pass,

          };
          let res = await cdService.adminLogin(param)
          console.log(res,'登录')
          if (res.data!==null) {
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success'
            });
            this.toAdmin()
          }else {
            this.$message({
              message: '请输入正确的用户名和密码',
              type: 'warning'
            });
          }

        }
        // submitForm(formName) {
        //   this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //       alert('submit!');
        //     } else {
        //       console.log('error submit!!');
        //       return false;
        //     }
        //   });
        // },
        // resetForm(formName) {
        //   this.$refs[formName].resetFields();
        // }
      }
    }
</script>

<style scoped>
  .admin{
    text-align: center;
    color: #060606;
    padding-top: 40px;
    margin-bottom: 30px;
  }
  .loginBorder{
    width: 420px;
    height: 320px;
    /*background:#ffffff;*/
    background: rgba(255,255,255,0.3);
    margin-left: 36%;
    margin-top: 100px;
    padding-left: 30px;
    /*opacity: 0.3;*/
    border: none;
    border-radius: 20px;
    /*box-shadow: 1px 1px 5px 7px #CCCCCC;*/
    z-index: 2;
  }
  .title{
    text-align: center;
    font-size: 38px;
    color: #ffffff;
    padding-top: 90px;
  }
  .login{
    width: 100%;
    height: 753px;
    background-image: url("../../public/assets/login.jpg");


  }
  .el-input__inner{
    width: 210px;
  }
</style>
