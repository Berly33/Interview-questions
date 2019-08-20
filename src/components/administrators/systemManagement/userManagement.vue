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
            <div class="subtitle">用户管理</div>
            <div class="search">
              <el-input placeholder="请输入你想搜索的内容" v-model="input3" @keyup.enter.native="searchData()"
                        class="searchClass">
                <el-button slot="append" icon="el-icon-search" @click.native="searchData()"></el-button>
              </el-input>
            </div>
            <el-table
              :data="tableData"
              stripe
              align="center"
              style="width: 100%;">
              <el-table-column
                label="#"
                type="index"
                width="250">
              </el-table-column>
              <el-table-column
                prop="userIp"
                label="IP地址"
                width="250">
              </el-table-column>
              <el-table-column
                prop="nickName"
                label="用户昵称"
                width="250">
              </el-table-column>
              <el-table-column
                prop="date"
                label="创建时间"
                width="280">2019-8-15
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
  </div>
</template>

<script>
  import cdService from "@/apis/service.cd";
  export default {
    name: "userManagement",
    data() {
      return {
        input3:'',
        tableData: [
          {
            userIp:'',
            nickName:'',
            userId:''
          }
        ]
      }
    },
    mounted() {
      this.getUser()
    },
    methods:{
      //删除用户
      async del(row) {
        this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
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
      //用户列表
      async getUser() {
        let param = {
          pageNo:1,
          pageSize:999,
          type:0
          };
        let res = await cdService.getAllUser(param)
        if (res){
          this.tableData = res.data
          console.log(this.tableData,'用户列表')
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
  .el-table td,
  .el-table th {
    text-align: center;
  }
</style>

