<template>
<div>
  <el-table
    ref="singleTable"
    :data="tableData"
   
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="topic"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      property="truePro"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="difficulty"
      label="地址">
    </el-table-column>
    <el-table-column
      property="questionSocre"
      label="评分">
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :pagesize="pagesize"  
      :total="total"
      layout="prev, pager, next, jumper">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage3: 5,
      tableData: [
        {
          topic: "",
          truePro: "",
          difficulty: "",
          questionSocre: ""
        }
      ],
      currentRow: null
    };
  },
  mounted() {
    //自动加载
    this.getList();
  },

  methods: {
     // getData() {
    //   this.$axios.get("http://192.168.1.199:8080/question/get/unprohibit",
    //     {
    //       pageNo: this.currentPage,
    //       pageSize: this.pagesize,
    //       totalPage: this.total,
    //       prohibit: 1,
    //     }).then(res => {
    //       this.tableData = res.data.questionSocre;
    //       })
    // },
      getList() {
      let param={
        pageSize: this.pagesize, //每页多少条
        pageNo: this.currentPage, //第几页
        totalPage: this.total, //总条数
        questionList: this.tableData,
        prohibit: 1,  
      }
      this.$axios.get("http://192.168.1.199:8080/question/get/unprohibit", {
          params:JSON.stringify(param),
        })
        .then(response => {
          let res = response.data
            this.tableData = res.data.questionList
          console.log(res);
        })
      },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>