<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入你想要的内容" v-model="input" class="searchClass">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-collapse style="width:90%;margin:0 auto;" accordion>
      <div class="lead">
        <span>编号</span>
        <span>题目</span>
        <span>类型</span>
        <span>通过率</span>
        <span>难度</span>
        <span>评分</span>
      </div>
      <el-collapse-item v-for="item in titleList" :data="titleList">
        <template style="padding-left:30px;color:#6b91ce;" slot="title">
          <span class="list_number">{{item.questionId}}</span>
          <span class="title-topic" style>
            {{item.topic}}测试长题目测试长题目测试长题目测试长题目
          </span>
          <span class="title-classifyName">{{item.classifyName}}</span>
          <span class="title-text">{{item.truePro}}</span>
          <span class="title-text">
              <el-tag
                size="medium"
                :type="item.difficulty==='初级'? 'success': item.difficulty==='中级'?'warning':'danger'"
                style="text-align:center;border: none;"
              >{{ item.difficulty }}</el-tag>
          </span>
          <span class="title-text">
              <el-rate
                v-model="item.questionSocre"
                allow-half=true
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
          </span>
        </template>
        <div v-if="item.classifyName == '选择题'" class="select">
          <div>{{item.topic}}测试长题目测试长题目测试长题目测试长题目测试长题目测试长题目测试长题目测试长题目测试长题目测试长题目测试长题目测试长题目（）？</div>
          <div>A、{{item.questionA}}</div>
          <div>B、{{item.questionB}}</div>
          <div>C、{{item.questionC}}</div>
          <div>D、{{item.questionD}}</div>
        </div>
        <div v-if="item.classifyName == '填空题'" class="completion">
          <div>{{item.topic}}测试长题目测试长题目测试长题目测试长题目测试____长题目测试长题目测试长题目测试长题目测试___长题目测试长题目测试长题目测试长题目？</div>
        </div>
        <div v-if="item.topic == '编程题'" class="code">编程题</div>
      </el-collapse-item>
    </el-collapse>
    <i class="el-icon-arrow-left" id="back" v-on:click="back()">返回上一页</i>
  </div>
</template>
<style>
  /* 导航引导词的样式 */
  .lead {
    height: 50px;
    line-height: 50px;
    width: 100%;
    letter-spacing: 2px;
    border-bottom: #ebeef5 1px solid;
  }

  /* 题目标题的样式 */
  .lead span {
    margin: 0 80px;
  }

  /* 编号序号的样式 */
  .list_number {
    width: 180px;
    text-align: center;
    margin-right: 20px;
  }

  /* 详情里的题的样式 */
  .title-topic {
    width: 170px; 
    overflow: hidden; /*设置超出的部分进行影藏*/
    text-overflow: ellipsis; /*设置超出部分使用省略号*/
    white-space: nowrap; /*设置为单行*/
    padding-left: 30px;
    color: #40a6ff;
  }

  .title-text {
    width: 207px;
    text-align: center;
  }

  .title-classifyName {
    width: 175px;
    text-align: center;
    margin-right: 12px;
  }


  .select,.completion,.code {
    width: 775px;
    margin-left: 228px;
    line-height: 35px;
    color: #9a9595;
  }


  /* 搜索框的样式 */
  .search {
    width: 50%;
    margin: 0 auto;
  }

  .searchClass {
    border-radius: 20px;
    background: #f4f4f4;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .searchClass .el-input-group__prepend {
    border: none;
    background-color: transparent;
    padding: 0 10px 0 30px;
  }

  .searchClass .el-input-group__append {
    border: none;
    background-color: transparent;
  }

  .searchClass .el-input__inner {
    height: 36px;
    line-height: 36px;
    border: none;
    background-color: transparent;
  }

  .searchClass .el-icon-search {
    font-size: 16px;
  }

  .searchClass .centerClass {
    height: 100%;
    line-height: 100%;
    display: inline-block;
    vertical-align: middle;
    text-align: right;
  }

  .searchClass .line {
    width: 1px;
    height: 26px;
    background-color: #f7f7f7;
    margin-left: 14px;
  }

  /* 返回 */
  #back {
    float: right;
    margin-top: 10px;
    margin-right: 200px;
    cursor: pointer;
    color: #807e7e;
    font-size: 14px;
  }
</style>
<script>
  import cdService from "@/apis/service.cd";
  import {callbackify} from "util";

  export default {
    data() {
      return {
        value: 3.5,
        total: 100, //默认数据总数
        pagesize: 6, //每页的数据条数
        currentPage: 1, //默认开始页面
        istag: true,
        input: "",
        titleList: [
          {
            classifyName: "",
            questionId: "",
            topic: "",
            truePro: "",
            difficulty: "",
            questionA: "",
            questionB: "",
            questionC: "",
            questionD: "",
            questionSocre: null
          }
        ]
      };
    },
    mounted() {
      //自动加载
      this.getList();
    },
    methods: {
      //获取题
      async getList() {
        let param = {
          pageNo: this.currentPage, //第几页
          pageSize: this.pagesize, //每页多少条
          subjectId: this.$route.params.subjectId
        };

        let res = await cdService.getSubjectList(param);
        if (res) {
          for (let item of res.data) {
            //判断
            switch (item.difficulty) {
              case 1:
              case 2:
              case 3:
                item.difficulty = "初级";
                break;
              case 4:
              case 5:
              case 6:
                item.difficulty = "中级";
                break;
              case 7:
              case 8:
              case 9:
              case 10:
                item.difficulty = "高级";
                break;
              default:
                item.difficulty = "未知";
                break;
            }
          }

          this.titleList = res.data;
          console.log(res, "res1111111111111212121");
        }
        console.log(res.data, "res1111111111111");
      },
      //返回上一页
      back() {
        this.$router.go(-1); //返回上一层
      }
      // //分页
      // tableRowClassName({ row, rowIndex }) {
      //   if (rowIndex === 0) {
      //     return "th";
      //   }
      //   return "";
      // },
      // switchChange() {
      //   this.istag = !this.istag;
      // },
      // created: function() {
      //   this.total = this.tableData.length;
      // },
      // current_change: function(currentPage) {
      //   this.currentPage = currentPage;
      // }
    }
  };
</script>
<style>
  .el-tag {
    align-items: center !important;
  }

  .number {
  }
</style>

