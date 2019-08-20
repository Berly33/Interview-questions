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
            <div class="subtitle">会员管理</div>
            <div class="action">
              <div class="search">
                <el-input placeholder="请输入你想搜索的内容" v-model="input3" @keyup.enter.native="searchData()"
                          class="searchClass">
                  <el-button slot="append" icon="el-icon-search" @click.native="searchData()"></el-button>
                </el-input>
              </div>
              <div class="add-user" @click="dialogFormVisible=true">添加</div>
            </div>
            <el-table
              :data="tableData"
              align="center"
              stripe
              style="width: 100%;">
              <el-table-column
                label="#"
                type="index"
                width="250">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="用户名"
                width="250">
              </el-table-column>
              <el-table-column
                prop="userType"
                label="角色"
                width="250">
              </el-table-column>
              <el-table-column
                prop="date"
                label="添加时间"
                width="280">2018-8-19
              </el-table-column>
              <el-table-column label="操作" width="250">
                <template slot-scope="{row}">
                  <el-button type="text" @click.native="del(row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog title="添加会员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认密码" :label-width="formLabelWidth">
          <el-input v-model="form.userPwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </div>
    </el-dialog>

  </div>


</template>

<script>
  import cdService from "@/apis/service.cd";

  export default {
    name: "MembershipManagement",
    data() {
      return {
        dialogFormVisible: false,
        form: {
          userName: '',
          userPwd: '',
          userType: '',
        },
        formLabelWidth: '120px',
        input3: '',
        tableData: [{
          userName: '',
          userType: '',
          userId: ''
        }]
      }

    },
    mounted() {
      this.getUser()
    },
    methods: {
      //添加会员
      async addUsers() {
        let param = {
          userName:this.form.userName,
          userPwd: this.form.userPwd,
          userType: 1,
        };
        let res = await cdService.addUser(param)
        console.log(res, '添加会员')
        if (res.code===200){
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        }
        this.dialogFormVisible = false
        this.getUser()
      },
      //删除用户
      async del(row) {
        this.$confirm("此操作将永久删除该成员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let param = {
              userId: row.userId
            };
            let res = await cdService.deleteUser(param);
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getUser();
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
      //会员列表
      async getUser() {
        let param = {
          pageNo: 1,
          pageSize: 999,
          type: 1
        };
        let res = await cdService.getAllUser(param)
        if (res) {
          for (let item of res.data) {
            //判断
            switch (item.userType) {
              case 1:
                item.userType = "会员";
                break;
              case 2:
                item.userType = "管理员";
                break;
              default:
                item.userType = "未知";
                break;
            }
          }
          this.tableData = res.data
          console.log(this.tableData, '会员列表')
        }

      }
    }
  }
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
    height: 97%;
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

  .action {
    display: flex;
  }

  .add-user {
    margin: 20px 100px 0 0;
    color: #40a6ff;
  }
  .searchClass{
    margin-bottom: 50px;
  }
  .el-table{
    margin-top: 50px;
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

</style>
