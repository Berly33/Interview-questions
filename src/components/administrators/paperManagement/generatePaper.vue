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
            <div class="subtitle">生成试卷</div>
            <div class="content">
              <template>
                <div class="generatePage" @click="toGenerate()">生成试卷</div>
                <el-tabs
                  v-model="activeName2"
                  type="card"
                  class="headerTag"
                  @tab-click="handleClick"
                >
                  <!-- 随机生成试卷 -->
                  <el-tab-pane label="随机" name="first">
                    <div class="text">
                      <div v-if="clickPage === 'pageTips'">
                        <div class="tips">请点击生成试卷</div>
                      </div>
                      <div v-else>
                        <div>试卷详情</div>
                        <div
                          class="text"
                          type="index"
                          v-for="(item,index) in DetailData"
                          :key="item.questionId"
                        >
                          <div>{{index+1}}、{{item.topic }}</div>
                          <div class="detail-choose" v-if="item.classifyId===flag">
                            <div>{{'A、'+ item.questionA }}</div>
                            <div>{{'B、'+item.questionB }}</div>
                            <div>{{'C、'+item.questionC }}</div>
                            <div>{{'D、'+item.questionD }}</div>
                          </div>
                          <img :src="item.questionPic" class="detail-image" />
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <!-- 指定生成试卷 -->
                  <el-tab-pane label="指定" name="second">
                    <div class="text">指定生成试卷</div>
                  </el-tab-pane>
                  <!-- 批量生成试卷 -->
                  <el-tab-pane label="批量" name="third">
                    <div class="text">批量生成试卷</div>
                  </el-tab-pane>
                </el-tabs>
              </template>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import cdService from "@/apis/service.cd";
export default {
  name: "paperType",
  data() {
    return {
      activeName2: "first",
      clickPage: "pageTips",
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
          classifyId: ""
        }
      ]
    };
  },
  mounted() {},
  methods: {
    //随机生成试卷
    async toGenerate() {
      let param = {
        subjectId: this.$route.params.subjectId,
        num: 1
      };
      console.log(this.$route.params.subjectId, "生成试卷的科目id");
      let res = await cdService.generatePage(param);
      this.clickPage = "";
      this.DetailData = [];
      if (res) {
        this.DetailData = res.data[0].questions;
        //console.log(res.data[0].questions, "生成试卷");
        // console.log(res.data, "生成试卷aa");
        // console.log(this.DetailData, "生成试卷aathis.DetailData");
        console.log("question:", this.DetailData);
      }
    },
    // 标签页
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
/* 底背景颜色-灰色 */
.el-main {
  text-align: left;
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
/* 头标签页 */
.headerTag {
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  /* position: absolute; */
  z-index: 2;
}
/* 指定生成 */
.text {
  margin: 20px 20px 0px 0px;
}
.tips {
  text-align: center;
  height: 500px;
  color: #a5a5a5;
}
/* 生成试卷 */
.generatePage {
  position: relative;
  top: 70px;
 /* left: 85%; */
  margin-left: 80%;
   /*margin-bottom: -50px; */
  z-index: 3;
  color: #409eff;
  cursor: pointer;
}
/* 试卷详情 */
.detail-choose {
  margin-top: 20px;
  margin-left: 40px;
}
.detail-image {
  margin-top: 20px;
  margin-left: 40px;
}
</style>


