<template>
  <div class="question-detail">
    <el-container>
      <el-container>
        <el-header style="text-align: right; font-size: 16px">
          <i class="back" style="color:#40a6ff"> <span> <i class="el-icon-arrow-left"  v-on:click="back()">返回</i></span> </i>
          <i class="el-icon-user-solid" style="margin-right: 15px;font-size: 20px"></i>
          <span>admin</span>
        </el-header>
        <el-main>
          <div class="main-back">
            <div class="subtitle">试题详情</div>
            <div class="action">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <li>{{DetailData.topic }}</li>
                </div>
                <div class="text">
                  <div class="detail-choose" v-if="DetailData.classifyId===flag">
                    <div>{{'A、'+ DetailData.questionA }}</div>
                    <div>{{'B、'+DetailData.questionB }}</div>
                    <div>{{'C、'+DetailData.questionC }}</div>
                    <div>{{'D、'+DetailData.questionD }}</div>
                  </div>
                  <img :src="DetailData.questionPic" class="detail-image"/>
                </div>
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item title="点击查看答案   " name="1">
                    <div>答案：{{DetailData.answerMain}}</div>
                  </el-collapse-item>
                </el-collapse>
              </el-card>
              <div>
                <img src="../../../../public/assets/xmmdt.gif" class="xmmdt">
                <div class="block">
                  <div>你本次为此题评了{{value1}}分</div>
                  <span class="demonstration">评分</span>
                  <el-rate v-model="value1" allow-half @click.native="questionDetailSocre()"></el-rate>
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
    name: "questionDetail",
    data() {
      return {
        value1:null,
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
      };
    },
    mounted() {
      this.questionDetail();
      console.log(this.$route);
      // this.questionDetailSocre();
    },
    methods: {

      //试题评分
      async questionDetailSocre() {
        let param = {
            questionId:this.$route.params.questionId,
            questionScore:this.value1,
            userId:1
      };
        console.log(this.value1, "问题评分id");
        console.log(this.$route.params.questionId, "问题评分id");
        let res = await cdService.scoreQuestion(param)
        if(res.code===200){
          console.log('评分成功')
        }

      },
      async questionDetail() {
        let param = {
          questionId: this.$route.params.questionId
        };
        let res = await cdService.getQuestionDetail(param);

        if (res) {
          console.log(res.data, "获取试题详情");
          this.DetailData = res.data;
          let ans = res.data.answerList.answerMain;
          this.DetailData.answerMain = ans;
        }
      },
      //返回上一页
      back() {
        this.$router.go(-1);//返回上一层
      },
      handleChange(val) {
        console.log(val);
      }
    }
  };
</script>

<style scoped>
  .el-header {
    background-color: #ffffff;
    color: #333;
    text-align: right;
    line-height: 80px;
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

  .el-icon-arrow-left {
    font-size: 16px;
    position: relative;
    /*top: 40px;*/
    left: 30px;
    cursor: pointer;
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

  .main-back {
    width: 98.6%;
    height: 97%;
    background: #ffffff;
    margin: 18px 0px 0px 16px;
  }

  .subtitle {
    text-align: left;
    padding: 5px;
    margin: 10px 10px 50px 10px;
    font-size: 12px;
    border-bottom: 1px solid #ebebeb;
    color: #a5a5a5;
  }

  .text {
    font-size: 14px;
    display: flex;
  }

  /*.clearfix:before,*/
  /*.clearfix:after {*/
  /*  display: table;*/
  /*  content: "";*/
  /*}*/

  /*.clearfix:after {*/
  /*  clear: both;*/
  /*}*/

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
    margin: 0px 0px 100px 30px;
  }

  .clearfix {
    float: left;
    line-height: 25px;


  }

</style>
<style>
  .el-card__header {
    overflow: hidden;
    font-weight: 600;
    text-align: left;
  }

  .el-card__body {
    overflow: hidden;
  }
  .el-rate__icon{
    font-size: 28px !important;
  }
</style>
