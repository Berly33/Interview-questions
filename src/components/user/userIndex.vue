<template>
  <div class>
    <el-container>
      <el-main>
        <div class="border-background">
          <div class="small-background">
            <el-autocomplete
              class="search"
              v-model="state4"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </div>

          <!--          横向滚动-->
          <div class="cardWrap" ref="cardWrap" style="cursor:pointer">
            <ul class="cardTab" ref="cardTab" v-model="cardLists">
              <div
                class="card-item"
                v-for="item in cardLists"
                :style="{'background':item.picBackground}"
                @click="toPage(item.subjectId)"
              >
                <div class="images-background">
                  <img :src="item.subjectPic" class="subject-images"/>
                </div>
                <div class="subject-background">{{item.subjectName}}</div>
              </div>
            </ul>
          </div>
        </div>
        <!-- 通过率 -->
        <div class="form-background">
          <div class="choose">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="通过率最高" name="first">
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column type="index" label="#" width="80"></el-table-column>
                  <el-table-column label="题目" width="250">
                    <template slot-scope="scope">
                      <div slot="reference" @click="toDetail(scope.row)">
                        <span
                          size="medium"
                          style="cursor:pointer;white-space: nowrap;color: #40a6ff"
                        >{{ scope.row.topic }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column header-align="center" label="通过率" width="180">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <span size="medium" style="text-align:center">{{ scope.row.truePro }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column header-align="center" label="评分" width="180">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <span size="medium" style="text-align:center">{{ scope.row.questionSocre }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="难度" header-align="center" width="180">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <el-tag
                          size="medium"
                          :type="scope.row.difficulty==='初级'? 'success': scope.row.difficulty==='中级'?'warning':'danger'"
                          style="text-align:center;border: none;"
                          effect="dark"
                        >{{ scope.row.difficulty }}
                        </el-tag>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="通过率最低" name="second">
                <el-table :data="tableDataMin" stripe style="width: 100%">
                  <el-table-column type="index" label="#" width="80"></el-table-column>
                  <el-table-column label="题目" width="250">
                    <template slot-scope="scope">
                      <div slot="reference" @click="toDetail(scope.row)">
                        <span
                          size="medium"
                          style="cursor:pointer;white-space: nowrap;color: #40a6ff"
                        >{{ scope.row.topic }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column header-align="center" label="通过率" width="180">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <span size="medium" style="text-align:center">{{ scope.row.truePro }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column header-align="center" label="评分" width="180">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <span size="medium" style="text-align:center">{{ scope.row.questionSocre }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="难度" header-align="center" width="180">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <el-tag
                          size="medium"
                          :type="scope.row.difficulty==='初级'? 'success': scope.row.difficulty==='中级'?'warning':'danger'"
                          style="text-align:center;border: none;"
                          effect="dark"
                        >{{ scope.row.difficulty }}
                        </el-tag>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="Label">
            <div class="label-center">
              <div class="hot-tag">热门标签</div>
              <div class="blue-tag">
                <el-tag type="blue" v-for="item in tags || []" class="hot-text">{{item.sortName}}</el-tag>
              </div>
              <div class="right-card">
                <div class="top-text">掌控全局</div>
                <div class="bottom-text">了解公司真实面试题</div>
              </div>
              <div class="right-card two">
                <div class="top-text">无需登录</div>
                <div class="bottom-text">轻松进入了解面试题</div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div class="bottom-background">
          <img src="../../../public/assets/jhlogin.png"/>
          <div class="address-text">
            陕西金合信息科技股份有限公司 地址：西安市雁塔区锦业路锦业时代B3座23层
            <br/>联系电话：029-81026199 | EMAIL : ikingtech@ikingtech.com
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  import cdService from "@/apis/service.cd";

  export default {
    name: "userIndex",
    data() {
      return {
        restaurants: [],
        state4: "",
        timeout: null,
        activeName: "first",
        currentDate: new Date(),
        activeIndex: "1",
        imgurl: null,
        activeIndex2: "1",
        tags: [
          {
            sortName: ""
          }
        ],
        cardLists: [
          {
            subjectPic: "",
            subjectName: "",
            picBackground: ""
          },
          {
            subjectPic: "",
            subjectName: "",
            picBackground: ""
          }
        ],
        tableData: [
          {
            topic: "",
            truePro: "",
            difficulty: "",
            questionSocre: ""
          }
        ],
        tableDataMin: [
          {
            topic: "",
            truePro: "",
            difficulty: "",
            questionSocre: ""
          }
        ]
      };
    },
    //横向滚动
    created() {
      this.$nextTick(() => {
        this.cardScroll();
      });
    },
    mounted() {
      this.restaurants = this.loadAll();
      this.list();
      this.tableListTop();
      this.tableListMin();
      this.getHotSort();
    },
    methods: {
      //横行滚动
      cardScroll() {
        let width = 4 * 5000;
        this.$refs.cardTab.style.width = width + "px";
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.cardWrap, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: "vertical"
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      //获取科目
      async list() {
        let res = await cdService.getSubject();
        if (res) {
          this.cardLists = res.data;
        }
      },

      //通过率最高10
      async tableListTop() {
        let param = {
          around: "max",
          num: 10
        };
        let res = await cdService.tableList(param);
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
          // this.$router.push({ name: "paperList", params: { subjectId: 20 } });
          this.tableData = res.data;
          console.log(res, "res1111111111111212121");
          console.log("res.data.subjectId:", res.data.subjectId);
        }
      },
      //通过率最低10
      async tableListMin() {
        let param = {
          around: "min",
          num: 10
        };
        let res = await cdService.tableList(param);
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
          // this.$router.push({ name: "paperList", params: { subjectId: 20 } });
          this.tableDataMin = res.data;
          console.log(res, "res1111111111111212121");
          console.log("res.data.subjectId:", res.data.subjectId);
        }
      },
      //获取热门标签
      async getHotSort() {
        let param = {
          num: 20
        };
        let res = await cdService.hotSort(param);
        if (res) {
          // this.$router.push({ name: "paperList", params: { subjectId: 20 } });
          this.tags = res.data;
          console.log("热门标签的res.data.sortName:", res.data);
        }
      },
      //科目卡片
      toPage(subjectId) {
        this.$router.push({
          name: "paperList",
          params: {subjectId: subjectId}
        });
        console.log("subjectId:", subjectId);
      },

      //通过率详情
      //跳转页面详情
      toDetail(row) {
        console.log(row);
        this.$router.push({
          name: "paperDetails",
          params: {questionId: row.questionId}
        });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      loadAll() {
        return [
          {value: "javaScript"},
          {value: "基本数据类型"},
          {value: "操作系统"}
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString
          ? restaurants.filter(this.createStateFilter(queryString))
          : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return state => {
          return (
            state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    }
  };
</script>

<style scoped>
  .subject-background {
    background: #ffffff;
    height: 90px;
    line-height: 90px;
    box-shadow: 3px 3px 7px #ebebeb;
  }

  .subject-images {
    width: 110px;
    height: 110px;
  }

  .images-background {
    margin: 70px 70px;
  }

  .card-item {
    height: 330px;
    border: 1px solid #f1f1f1;
    margin: 0px 60px 0px 40px;
    border-radius: 5px;
  }

  .cardTab {
    display: flex;
  }

  .cardWrap {
    width: 300px;
    position: relative;
    top: -120px;
  }

  .el-header,
  .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0px;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    padding: 0px;
    overflow-x: hidden;
  }

  .el-menu-item {
    padding-right: 30px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-menu--horizontal > .el-menu-item {
    float: right;
  }

  /*.el-menu--horizontal > .el-submenu {*/
  /*  float: right;*/
  /*}*/
  .login-image {
    float: left;
    margin: 31px 10px 10px 30px;
  }

  .border-background {
    width: 100%;
    height: 630px;
    background: #f4f4f4;
  }

  .small-background {
    background: #d7d7d7;
    width: 100%;
    height: 300px;
  }

  .search {
    margin-top: 60px;
    width: 350px;
  }

  .form-background {
    display: flex;
    width: 100%;
    margin-bottom: 50px;
  }

  .choose {
    flex: 2;
    height: 100px;
    margin-left: 85px;
  }

  .Label {
    flex: 1;
    border: 1px solid #eaeaea;
    margin: 37px 20px;
    display: flex;
    justify-content: center;
  }

  .el-card {
    border: none;
  }

  .success {
    color: #009999;
  }

  .right-card {
    height: 140px;
    background: #0033ff;
    margin: 30px 10px;
    padding-top: 30px;
  }

  .hot-tag {
    font-size: 14px;
    color: #909399;
    font-weight: bold;
    margin: 30px;
  }

  .hot-text {
    margin: 7px 4px;
  }

  .two {
    background: #00cc66;
    margin-bottom: 48px;
  }

  .top-text {
    font-size: 35px;
    color: #ffff33;
    margin: 20px 0;
  }

  .bottom-text {
    font-size: 20px;
    color: #ffffff;
  }

  .bottom-background {
    border-top: 1px solid #eaeaea;
    padding-top: 20px;
    display: flex;
  }

  .address-text {
    color: #060606;
    z-index: 2;
  }

  .label-center {
    width: 77%;
  }

  .bottom-background img {
    width: 110px;
    height: 22px;
    margin: 17px 20px 120px 400px;
  }

  /* 单元格内容 */
  .name-wrapper {
    text-align: center;
  }

  .el-menu--horizontal > .el-menu-item {
    float: right;
  }
</style>
<style scoped>
  .cell {
    padding-left: 50px !important;
  }

  .el-input__inner {
    margin-top: 60px;
    width: 350px;
  }
</style>
