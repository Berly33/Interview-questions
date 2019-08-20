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
            <div class="subtitle">试卷详情</div>
            <div class="action">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <li>试卷一</li>
                </div>
                <div v-for="(item,index) in DetailData">
                  <div class="question-title">{{index+1}}、{{item.topic}}</div>
                  <div class="text">
                    <div class="detail-choose" v-if="item.classifyId===flag">
                      <div>{{'A、'+ item.questionA }}</div>
                      <div>{{'B、'+item.questionB }}</div>
                      <div>{{'C、'+item.questionC }}</div>
                      <div>{{'D、'+item.questionD }}</div>
                    </div>
                    <img :src="item.questionPic" class="detail-image"/>
                  </div>
                </div>
                <!--                <el-collapse v-model="activeNames" @change="handleChange">-->
                <!--                  <el-collapse-item title="点击查看答案   " name="1">-->
                <!--                    <div>答案：{{DetailData.answerMain}}</div>-->
                <!--                  </el-collapse-item>-->
                <!--                </el-collapse>-->
              </el-card>
              <div>
                <img src="../../../../public/assets/xmmdt.gif" class="xmmdt">
<!--                <div class="block">-->
<!--                  <span class="demonstration">评分</span>-->
<!--                  <el-rate v-model="value1" allow-half @click.native="questionDetailSocre()"></el-rate>-->
<!--                </div>-->
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
    name: "paperDetail",
    data() {
      return {
        value1: null,
        flag: 1,
        DetailData: [
          {
            topic: "",
            questionA: "",
            questionB: "",
            questionC: "",
            questionD: "",
            questionPic: "",
            answerMain: "",
            classifyId: ''
          }
        ],
        activeNames: ["1 "],
        chooseList: [
          {title: "A", text: "int"},
          {title: "B", text: "string"},
          {title: "C", text: "null"},
          {title: "D", text: "number"}
        ]
      }
    },
    mounted() {
      this.paperDetail()

    },
    methods: {
      async paperDetail() {
        let param = {
          testPaperId: this.$route.params.testpaperId
        };
        console.log(this.$route.params.testpaperId, '试卷id');
        let res = await cdService.getPaperDetail(param)
        console.log(res.data.questions, '试卷详情')
        this.DetailData = res.data.questions

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
  }

  .action {
    display: flex;
    margin-left: 90px;
  }

  .block {
    font-size: 17px;
    text-align: left;
    line-height: 60px;
    margin: 50px 0px 0px 150px;
  }

  .xmmdt {
    position: absolute;
    top: 200px;
    width: 200px;
    height: 250px;
    margin-left: 130px;
  }

  .back {
    font-size: 15px;
    font-family: '宋体';
    font-style: normal;
    position: relative;
    right: 90%;
    cursor: pointer;
  }

  .text {
    font-size: 14px;
    display: flex;
  }


  .box-card {
    width: 50%;
    overflow: hidden;
    margin-left: 50px;
  }

  .question-detail {
    width: 100%;
    height: 751px;
  }

  .detail-choose {
    width: 80%;
    text-align: left;
    line-height: 35px;
    overflow: hidden;
  }

  .detail-image {
    width: 150px;
    height: 150px;
    margin: 0px 0px 50px 30px;

  }

  .clearfix {
    float: left;
    line-height: 25px;
  }

  .question-title {
    text-align: left;
    margin-bottom: 20px;
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
