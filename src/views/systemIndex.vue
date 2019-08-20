<template>
  <div class="home">
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <img src="../../public/assets/jhlogin.png" class="login-image">
        <div class="admin-login" @click="login()">管理员登录</div>
      </el-menu>
    </el-header>
    <div class="use" >
      <img src="../../public/assets/index1.jpg">
      <div class="text style" @click="start()">立即使用</div>
    </div>
    <div class="introduce">
      <div class="Answer">
        <div class="title style">{{title1}}</div>
        <div class="details">
          <div>
            <img class="imagess" src="../../public/assets/bz1.png">
            <div class="introduce"><p>{{titleP1}}</p>
              {{introduce1}}
            </div>
          </div>
          <img src="../../public/assets/sy1.png">
        </div>
      </div>
      <div class="Answer">
        <div class="details">
          <img src="../../public/assets/sy2.png">
          <div>
            <img class="imagess" src="../../public/assets/bz2.png">
            <div class="introduce"><p>{{titleP2}}</p>
              {{introduce2}}
            </div>
          </div>
        </div>
      </div>
      <div class="Answer">
        <div class="details">
          <div>
            <img class="imagess" src="../../public/assets/bz3.png">
            <div class="introduce"><p>{{titleP3}}</p>
              {{introduce3}}
            </div>
          </div>
          <img src="../../public/assets/sy4.png">
        </div>
      </div>
    </div>
    <div class="Analysis">
      <div class="data">
        <div class="title style">{{title2}}</div>
        <div class="details">
          <div id="main"></div>
          <div class="introduce text"><p>{{titleP5}}</p>
            {{introduce5}}
          </div>
        </div>
      </div>
      <div class="data">
        <div class="details">
          <div class="introduce text"><p>{{titleP4}}</p>
            {{introduce4}}
          </div>
          <div id="main1"></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      陕西金合信息科技股份有限公司<br>
      产品服务 关于我们 加入我们 联系我们<br>
      西安市雁塔区锦业路锦业时代B3座23层<br>
      联系电话：029-81026199 | EMAIL : ikingtech@ikingtech.com
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: "index",
    data() {
      return {
        activeIndex: ' ',
        title1: "一起使用在线面试系统",
        title2: "数据分析",
        titleP1: "简单易用的随机生成试卷",
        titleP2: "你也是平台的贡献者",
        titleP3: "指定生成，导出文档，掌控全局",
        titleP4: "2019年前半年访问标签前10情况统计",
        titleP5: "各科目面试题访问次数比较",
        introduce1: "简单易用的在随机生成试卷，无论是从操作，还是从美观上，都会给用户一种轻松的感觉选择自己面试的方向之后会随机生成一份面试题。提高面试效率。",
        introduce2: "做一件让自己骄傲的事，为面试的人员添加自己的面试题，为大家丰富这个平台，希望他们找到属于自己的辉煌。",
        introduce3: "管理员按需求生成试卷，导出文档，现场面试的人员可直接解答。减少面试人等待时间，简单、方便、高效。",
        introduce4: "双向绑定：每个月的访问最多，增长率最高，箭头函数：访问次数最少， 增长率基本保持稳定.",
        introduce5: "Java：访问次数最高占33.04%，JavaScript访问次数占30.57%，Vue访问次数占23.08%，Linux访问次数最少占13.31%",
      };
    },

    mounted() {
      this.draw()
    },
    methods: {

      draw() {
        var myChart = echarts.init(document.getElementById('main'));
        var myChart1 = echarts.init(document.getElementById('main1'));
        myChart.setOption({
            title: {
              text: '去年各科目面试题访问次数比较',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['Java', 'JavaScript', 'Vue', 'Linux']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: 335, name: 'Java'},
                  {value: 310, name: 'JavaScript'},
                  {value: 234, name: 'Vue'},
                  {value: 135, name: 'Linux'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          },
        );

        myChart1.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['线程', '数据类型', '对象', '回调函数', '双向绑定', '注解', '元素居中', '异常', '箭头函数']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '线程',
                type: 'bar',
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: '数据类型',
                type: 'bar',
                stack: '广告',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '对象',
                type: 'bar',
                stack: '广告',
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '回调函数',
                type: 'bar',
                stack: '广告',
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: '双向绑定',
                type: 'bar',
                data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                markLine: {
                  lineStyle: {
                    normal: {
                      type: 'dashed'
                    }
                  },
                  data: [
                    [{type: 'min'}, {type: 'max'}]
                  ]
                }
              },
              {
                name: '注解',
                type: 'bar',
                barWidth: 5,
                stack: '搜索引擎',
                data: [620, 732, 701, 734, 1090, 1130, 1120]
              },
              {
                name: '元素居中',
                type: 'bar',
                stack: '搜索引擎',
                data: [120, 132, 101, 134, 290, 230, 220]
              },
              {
                name: '异常',
                type: 'bar',
                stack: '搜索引擎',
                data: [60, 72, 71, 74, 190, 130, 110]
              },
              {
                name: '箭头函数',
                type: 'bar',
                stack: '搜索引擎',
                data: [62, 82, 91, 84, 109, 110, 120]
              }
            ]
          },
        );

      },
      // 点击开始使用跳转
      start(){
        this.$router.push({
        name: "userIndex",
      });
      },
      // 点击管理员登录跳转
      login(){
        this.$router.push({
        name: "login",
      });
      },
      // login(){
      //   this.$router.push({
      //   name: "userManagement",
      // });
      // },
    }

  }
</script>
<style>
  body {
    margin: 0;
  }
</style>
<style scoped>
  .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 80px;
    padding: 0px;
  }

  .admin-login {
    border: none;
    padding-right: 30px;
    cursor:pointer;
  }
  .admin-login:hover {
    color: #40a6ff;

  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-menu--horizontal > .admin-login {
    float: right;
  }

  /*.el-menu--horizontal > .el-submenu {*/
  /*  float: right;*/
  /*}*/
  .login-image {
    float: left;
    margin: 25px 10px 10px 30px;
  }
  .bottom {
    width: 100%;
    height: 160px;
    background: #6e6e6e;
    text-align: center;
    padding-top: 50px;
  }

  #main, #main1 {
    width: 600px;
    height: 400px;
    margin: 100px;
  }

  .details .text {
    margin-top: 150px !important;
  }

  .Analysis .data {
    width: 100%;
    background: #f1f1f1;
    margin-top: 20px;
  }

  .imagess {
    width: 30px !important;
    height: 30px !important;
    margin-bottom: 10px !important;

  }

  p {
    line-height: 20px;
    font-size: 22px;
    font-weight: bold;
    color: #555858;
  }

  .details img {
    width: 40%;
    height: 320px;
    box-shadow: 1px 1px 10px 10px #e5dee4;
    margin: 100px;


  }

  .details .introduce {
    width: 420px;
    font-size: 19px;
    line-height: 40px;
    color: #6d7070;
    margin-left: 100px;
    margin-right: 100px;

  }

  .details {
    display: flex;
  }

  .Answer .title, .Analysis .data {
    width: 100%;
    text-align: center;
    padding-top: 50px;
  }

  .Answer {
    width: 94%;
    background: #f9f9f9;
    margin-left: 3%;
    margin-top: 20px;
  }

  .use .text {
    width: 200px;
    height: 80px;
    background: black;
    position: absolute;
    top: 60%;
    left: 45%;
    color: #ffffff;
    text-align: center;
    line-height: 80px;
    border-radius: 50px;
    opacity: 0.7;
    cursor: pointer;
  }

  .use img {
    width: 100%;
    height: 703px;
  }

  .top {
    width: 100%;
    height: 50px;
    background: #40a6ff;
  }

  .style {
    font-size: 33px;
    color: #40a6ff;
  }
</style>
