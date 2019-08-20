<template>
  <div>
    <el-main>
      <div class="main-back">
        <div class="subtitle">科目列表<span class="to-paper" @click="toPaperList()">查看试卷列表</span></div>
        <div class="content">
          <el-row>
            <el-col :span="8" v-for="item in subjectList">
              <el-card
                :body-style="{ padding: '0px'}"
                :style="{'background':item.picBackground}"
                @click.native="toPage(item.subjectId)"
                class="card"
              >
                <div class="img-background">
                  <img :src="item.subjectPic" class="image"/>
                </div>
                <div style="padding: 15px;" class="title">
                  <span class="title_content">{{item.subjectName}}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
  import cdService from "@/apis/service.cd";

  export default {
    name: "paperType",
    data() {
      return {
        subjectList: [
          {
            picBackground: "",
            subjectPic: "",
            subjectName: "",
            subjectId: ""
          }
        ]
      };
    },
    mounted() {
      this.getSubjects();
      // this.addSubject();
    },
    methods: {
      // 点击查看列表
      toPaperList() {
        this.$router.push({
          name: "allPaperList"
        });
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
        if (res) {
          for (let item of res.data) {
            //判断
            switch (item.picBackground) {
              case "#0099FF":
                item.picBackground = "rgb(169, 233, 211)";
                break;
              case "#00CC99":
                item.picBackground = "#c3c4fa";
                break;
              case "#FF9966":
                item.picBackground = "#e9b1c2";
                break;
              case "#CC66FF":
                item.picBackground = "#a6c6e6";
                break;
              case "#CC9933":
                item.picBackground = "#d0e3ff";
                break;
              case "#FF66CC":
                item.picBackground = "#ffe6cc";
                break;
              case "#FF9933":
                item.picBackground = "#c6e9b1";
                break;
              case "#0099CC":
                item.picBackground = "rgb(169, 233, 211)";
                break;
              case "#00CC66":
                item.picBackground = "rgb(169, 233, 211)";
                break;
              case " #CC66FF":
                item.picBackground = "#d3b1e9";
                break;
              default:
                item.difficulty = "未知";
                break;
            }
          }
          this.subjectList = res.data;
        }
        console.log(this.subjectList, "获取所有科目");
        console.log(res.data[0].subjectId, "获取科目id");
      },
      // 点击卡片跳转
      toPage(subjectId) {
        this.$router.push({
          name: "generatepaper",
          params: {subjectId: subjectId}
        });
        console.log("subjectId:", subjectId);
      },
    }
  };
</script>

<style scoped>
  /* 生成试卷 */
  .subtitle {
    text-align: left;
    padding: 5px;
    margin: 10px;
    font-size: 12px;
    border-bottom: 1px solid #ebebeb;
    color: #a5a5a5;
    /* color: #c3c4fa; */
  }
.to-paper{
  font-weight: bold;
  cursor: pointer;
  float: right;
  font-size: 15px;
 line-height: 10px;

}
.to-paper:hover{
  color: #40a6ff;
}
  .content {
    margin-bottom: 50px;
  }

  /* 卡片 */
  .el-col-8 {
    width: 19.33333%;
  }

  .card {
    height: 300px;
    cursor: pointer;
    background: rgb(169, 233, 211);
    margin-left: 50px;
    margin-top: 40px;
  }

  /* 图片 */
  .image {
    margin-top: 50px;
    height: 100px;
    width: 100px;
  }

  /* 面试题文字 */
  .title {
    margin-top: 30px;
  }

  .title_content {
    font-size: 25px;
    font-weight: 600;
    color: rgb(80, 78, 78);
  }
  .lookList{
   position: relative;

  }
</style>


