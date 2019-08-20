<template>
  <div>
    <el-container>
      <el-container>
        <el-header style="text-align: right; font-size: 16px">
          <i class="el-icon-user-solid" style="margin-right: 15px;font-size: 20px"></i>
          <span>admin</span>
        </el-header>
        <el-main>
          <!--          <div class="subtitle">试卷列表</div>-->
          <div class="main-back">
            <div class="subtitle">试卷列表</div>
            <div class="record">
              <div class="centss">
                <div class="record-children" v-for="item in detailData">
                  <div class="image-title" @click="toDetail(item.testpaperId)">
                    <img :src="item.subjectInfo.subjectPic" class="image-logo">
                    <div class="title-name">
                      <div >{{item.testpaperNumber}}</div>
                      <div class="title-on">{{item.subjectInfo.subjectName}}</div>
                    </div>
                  </div>
                  <div class="list-line">
                    {{item.gmtCreate}}<span>
                    <el-dropdown>
                                       <span>
                                       <i class="el-icon-download" style="color:#40a6ff"> 下载</i>
                                       </span>
                      <el-dropdown-menu>
                        <el-dropdown-item @click.native="downloadPaper(item.testpaperId)">pdf格式</el-dropdown-item>
                        <el-dropdown-item @click.native="downloadPaperW(item.testpaperId)">world格式</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import cdService from "../../../apis/service.cd";

  export default {
    name: "paperList",
    data() {
      return {
        detailData: [{
          subjectInfo: [],
          subjectPic: '',
          subjectName: '',
          gmtCreate: '',
          testpaperNumber: '',
          testpaperId: ''

        }]
      }
    },
    mounted() {
      this.paperList()
    },
    methods: {
      //下载试卷pdf
      async downloadPaper(testpaperId) {
        console.log(testpaperId);
        window.open(`http://192.168.1.199:8081/testpaper/export?format=pdf&testPaperlist=${testpaperId}`)
      },
      //下载试卷world
      async downloadPaperW(testpaperId) {
        console.log(testpaperId);
        window.open(`http://192.168.1.199:8081/testpaper/export?format=word&testPaperlist=${testpaperId}`)
      },
      //试卷列表
      async paperList() {
        let param = {
          pageNo: 1,
          pageSize: 999
        };
        let res = await cdService.getPaperList(param)

        this.detailData = res.data;
        console.log(this.detailData, '获取试卷列表')
      },
      toDetail(testpaperId) {
        this.$router.push({
          name: "paperDetail",
          params: {testpaperId: testpaperId}
        });

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


  .el-col-12 {
    width: 100%;
  }

  .img-login {
    margin-top: 35px;
  }

  .main-back {
    width: 97.6%;
    overflow: hidden;
    background: #ffffff;
    margin: 12px 0px 0px 18px;
  }

  .centss {
    width: 1154px;
    /*width: 98.6%;*/
    overflow: hidden;
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
    /* color: #c3c4fa; */
  }

  .record {
    width: 97.6%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 30px;
  }

  .record-children {
    width: 40%;
    height: 150px;
    margin: 20px 4.9%;
    float: left;
    border: 1px solid #ccc5c5;
    border-radius: 10px;
    cursor: pointer;
    background: rgb(181, 197, 216);
  }

  .image-title {
    display: flex;
    margin: 20px;
  }

  .image-logo {
    width: 70px;
    height: 70px;
  }

  .title-name {
    margin: 10px 40px;
    font-size: 20px;
    text-align: left;
  }

  .title-on {
    font-size: 15px;
    color: #7f7979;
    line-height: 25px;
  }

  .list-line {
    width: 91%;
    border-top: 1px solid #fef5f5;
    padding: 8px 0;
    margin: 0 30px;
    text-align: left;
    font-size: 15px;
    color: #40a6ff;
  }

  .list-line, span {
    float: right;
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


