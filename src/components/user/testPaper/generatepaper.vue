<template>
  <div>
    <div class="main-back">
      <div class="content">
        <template>
          <div class="generatePage" @click="toGenerate()">生成试卷</div>
          <el-tabs v-model="activeName2" type="card" class="headerTag" @tab-click="handleClick">
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
                    <div class="topic">{{index+1}}、{{item.topic }}</div>
                    <div class="detail-choose" v-if="item.classifyId===flag">
                      <div>{{'A、'+ item.questionA }}</div>
                      <div>{{'B、'+item.questionB }}</div>
                      <div>{{'C、'+item.questionC }}</div>
                      <div>{{'D、'+item.questionD }}</div>
                    </div>
                    <img :src="item.questionPic" class="detail-image" />
                  </div>
                  <div class="lookList" @click="toPage()"> >>查看试卷列表</div>
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
    },
    // 点击查看列表
    toPage() {
      this.$router.push({
        name: "allPaperList"
      });
      console.log("subjectId:", subjectId);
    },
  }
};
</script>

<style scoped>
/* 头标签页 */
.headerTag {
  width: 90%;
  margin-right: auto;
  margin-left: auto;
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
  top: 30px;
  margin-left: 85%;
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
.topic {
  width: 90%;
}
.lookList {
  color: #409eff;
  cursor: pointer;
  margin-bottom: 50px;
}
</style>


