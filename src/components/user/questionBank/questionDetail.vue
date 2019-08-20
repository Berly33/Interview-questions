<template>
  <div class="question-detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><li>下面选项中不属于javaScript数据类型的是？</li></span>
      </div>
      <div v-for="(item,i) in chooseList || []" :key="i" class="text item">
        {{item.title +'、'}}{{item.text }}
      </div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="点击查看答案   " name="1">
          <div>答案：A</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
    
</template>

<script>
    export default {
        name: "questionDetail",
      data() {
        return {
          activeNames: ['1 '],
          chooseList: [
            {title: 'A', text: 'int'},
            {title: 'B', text: 'string'},
            {title: 'C', text: 'null'},
            {title: 'D', text: 'number'},
          ]
        }
      },
      methods: {
        handleChange(val) {
          console.log(val);
        }
      }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

</style>
