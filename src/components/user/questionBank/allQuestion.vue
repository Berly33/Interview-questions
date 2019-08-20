<template>
  <div class="main">
    <div class="search">
      <el-input
        v-loading="loading"
        placeholder="请输入你想搜索的内容"
        @keyup.enter.native="searchData()"
        v-model="input"
        class="searchClass"
      >
        <el-button slot="append" icon="el-icon-search" @click.native="searchData()"></el-button>
      </el-input>
      <el-button type="text" class="add" @click="add">添加</el-button>
    </div>
    <!-- 排序 -->
    <div class="question-px">
      <el-select v-model="sortValue" filterable placeholder="按分类排序">
        <el-option
          @click.native="sortSearch()"
          v-for="item in sortOptions || []"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- 添加 -->
    <!-- 题库列表 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" class="allHander" style>
      <el-tab-pane label="全部" name="first" style="width: 100%; margin: 0 auto">
        <el-table
          v-loading="loading"
          :data="tableData"
          @selection-change="handleSelectionChange"
          align="center"
          stripe
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column label="#" type="index" width="150"></el-table-column>
          <el-table-column label="题目" width="250">
            <template slot-scope="scope">
              <div slot="reference" @click="toPage(scope.row)">
                <span class="topic" size="medium" v-html="scope.row.topic">{{ scope.row.topic }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="通过率" width="250">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span size="medium" style="text-align:center">{{ scope.row.truePro }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="评分" width="250">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span size="medium" style="text-align:center">{{ scope.row.questionSocre }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="难度" header-align="center" width="250">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag
                  v-html="scope.row.difficulty"
                  size="medium"
                  :type="scope.row.difficulty==='初级'? 'success': scope.row.difficulty==='中级'?'warning':'danger'"
                  style="text-align:center;border: none;"
                  effect="dark"
                >{{ scope.row.difficulty }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" width="250">
            <template slot-scope="scope">
              <div slot="reference" @click="toPage(scope.row)" class="name-wrapper">
                <el-button class="answer" type="text">查看</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--分页 -->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          class="paging"
          layout="total, sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <!-- 我的 -->
      <el-tab-pane label="我的" name="second" style="width: 100%;margin:0 auto;">
        <el-table
          v-loading="loading"
          :data="tableMyData"
          :cell-style="cellStyle"
          @selection-change="handleSelectionChangeMy"
          :header-cell-class-name="rowClass"
          class="table"
          align="center"
          stripe
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column label="#" type="index" width="150"></el-table-column>
          <el-table-column label="题目" width="250">
            <template slot-scope="scope">
              <div slot="reference" @click="toPage(scope.row)">
                <span size="medium" class="topic">{{ scope.row.topic }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="通过率" width="250">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span size="medium" style="text-align:center">{{ scope.row.truePro }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="评分" width="250">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span size="medium" style="text-align:center">{{ scope.row.questionSocre }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="难度" header-align="center" width="250">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag
                  size="medium"
                  :type="scope.row.difficulty==='初级'? 'success': scope.row.difficulty==='中级'?'warning':'danger'"
                  style="text-align:center;border: none;"
                  effect="dark"
                >{{ scope.row.difficulty }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="操作" width="250">
            <template slot-scope="scope">
              <div class="name-wrapper">
                <el-button type="text" @click.native="getQuestionDetail(scope.row)">修改</el-button>
                <!-- <el-button type="text" @click.native.prevent="prohibit()" style="color:red">禁用</el-button> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--分页 -->
        <el-pagination
          background
          @size-change="handleSizeChangeMy"
          @current-change="handleCurrentChangeMy"
          :current-page="currentPageMy"
          :page-size="pagesize"
          class="paging"
          layout="total, sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加弹出框 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick1">
        <!-- 填空题 -->
        <el-tab-pane label="填空题" name="3">
          <el-form :model="form">
            <el-form-item label="难 度" :label-width="formLabelWidth" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="item in LevelList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="类 型" :label-width="formLabelWidth" prop="types">
              <el-cascader
                v-model="form.types"
                placeholder="请选择"
                :options="subjectList"
                :props="subjectOptProp"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="题 目" :label-width="formLabelWidth">
              <el-input
                v-model="form.topic"
                type="textarea"
                :rows="5"
                placeholder="请输入题目"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="答 案" :label-width="formLabelWidth">
              <el-input
                v-model="form.answer"
                type="textarea"
                :rows="5"
                placeholder="请输入答案"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 图片上传 -->
            <el-form-item label="图 片" :label-width="formLabelWidth">
              <el-upload
                action="http://192.168.1.199:8081/upload/image"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handlesuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 选择题 -->
        <el-tab-pane label="选择题" name="1">
          <el-form :model="form">
            <el-form-item label="难 度" :label-width="formLabelWidth">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="item in LevelList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类 型" :label-width="formLabelWidth" prop="types">
              <el-cascader
                v-model="form.types"
                placeholder="请选择"
                :options="subjectList"
                :props="subjectOptProp"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="题 目" :label-width="formLabelWidth">
              <el-input
                v-model="form.topic"
                type="textarea"
                :rows="5"
                placeholder="请输入题目"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="选项A" :label-width="formLabelWidth">
              <el-input v-model="form.inputA" placeholder="请输入选项" class="choose-input"></el-input>
            </el-form-item>
            <el-form-item label="选项B" :label-width="formLabelWidth">
              <el-input v-model="form.inputB" placeholder="请输入选项" class="choose-input"></el-input>
            </el-form-item>
            <el-form-item label="选项C" :label-width="formLabelWidth">
              <el-input v-model="form.inputC" placeholder="请输入选项" class="choose-input"></el-input>
            </el-form-item>
            <el-form-item label="选项D" :label-width="formLabelWidth">
              <el-input v-model="form.inputD" placeholder="请输入选项" class="choose-input"></el-input>
            </el-form-item>

            <el-form-item label="答 案" :label-width="formLabelWidth">
              <el-select v-model="form.answer" placeholder=" ">
                <!--                        <el-option label="A" value="primary"></el-option>-->
                <!--                        <el-option label="B" value="intermediate"></el-option>-->
                <!--                        <el-option label="C" value="senior"></el-option>-->
                <!--                        <el-option label="D" value="senior"></el-option>-->
                <el-option v-for="item in ChooseList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <!-- 图片上传 -->
            <el-form-item label="图 片" :label-width="formLabelWidth">
              <el-upload
                action="http://192.168.1.199:8081/upload/image"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handlesuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 编程题 -->
        <el-tab-pane label="编程题" name="5">
          <el-form :model="form">
            <el-form-item label="难 度" :label-width="formLabelWidth">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="item in LevelList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类 型" :label-width="formLabelWidth" prop="types">
              <el-cascader
                v-model="form.types"
                placeholder="请选择"
                :options="subjectList"
                :props="subjectOptProp"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="题 目" :label-width="formLabelWidth">
              <el-input
                v-model="form.topic"
                type="textarea"
                :rows="5"
                placeholder="请输入题目"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 图片上传 -->
            <el-form-item label="图 片" :label-width="formLabelWidth">
              <el-upload
                action="http://192.168.1.199:8081/upload/image"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handlesuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改弹出框 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible1">
      <el-form :model="updateForm" ref="update">
        <el-form-item label="题型" :label-width="formLabelWidth">
          <el-select v-model="updateForm.classifyName" disabled placeholder="选择题">
            <el-option label="选择题" name="1" value="select"></el-option>
            <el-option label="填空题" name="3" value="gapFilling"></el-option>
            <el-option label="编程题" name="5" value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难 度" :label-width="formLabelWidth">
          <el-select v-model="updateForm.difficulty" placeholder="1">
            <el-option v-for="item in LevelList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类 型" :label-width="formLabelWidth" prop="types">
          <el-cascader
            v-model="updateForm.sortId"
            placeholder="请选择"
            :options="subjectList"
            :props="subjectOptProp"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input
            v-model="updateForm.topic"
            type="textarea"
            :rows="5"
            placeholder="请输入题目"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div v-if="this.updateForm.classifyId === flag">
          <el-form-item label="选项A" :label-width="formLabelWidth">
            <el-input v-model="updateForm.questionA" placeholder="请输入选项" class="choose-input"></el-input>
          </el-form-item>
          <el-form-item label="选项B" :label-width="formLabelWidth">
            <el-input v-model="updateForm.questionB" placeholder="请输入选项" class="choose-input"></el-input>
          </el-form-item>
          <el-form-item label="选项C" :label-width="formLabelWidth">
            <el-input v-model="updateForm.questionC" placeholder="请输入选项" class="choose-input"></el-input>
          </el-form-item>
          <el-form-item label="选项D" :label-width="formLabelWidth">
            <el-input v-model="updateForm.questionD" placeholder="请输入选项" class="choose-input"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-input
            v-model="updateForm.answerList.answerMain"
            type="textarea"
            :rows="5"
            placeholder="请输入答案"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <img width="10%" height="10%" :src="updateForm.picurl" alt />
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="上传" :label-width="formLabelWidth">
          <el-upload
            v-model="updateForm.picurl"
            action="http://192.168.1.199:8080/upload/image"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handlesuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="updQuestionDetail()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.main {
  margin-top: 50px;

}
/* 全部/我的 */
.allHander {
  width: 95%;
  margin: 0 auto;
  left: 5%;
  position: absolute;
  z-index: 1;


}
/* 添加样式 */
.add {
  font-size: 18px;
  margin-right: -100px;
  margin-top: 10px;
  float: right;
}
.el-icon-plus {
  font-size: 25px;
}
/* 单元格内容 */
.name-wrapper {
  text-align: center;
}
/* 分页样式 */
.paging {
  text-align: center;
  margin-top: 30px;
}
/* 排序 */
.question-px {
  position: absolute;
  margin-left: 15%;
  margin-top: -10px;
  /* margin-bottom: -40px; */
  z-index: 2;
}
/* 搜索 */
.search {
  position: absolute;
  margin-left: 30%;
  /* margin-bottom: 10px; */
  margin-top: -20px;
  z-index: 3;
}
.topic {
  overflow: hidden; /*设置超出的部分进行影藏*/
  text-overflow: ellipsis; /*设置超出部分使用省略号*/
  white-space: nowrap; /*设置为单行*/
  cursor: pointer;
  color: #40a6ff;
}
</style>
<script>
import cdService from "@/apis/service.cd";
import { callbackify, log } from "util";
export default {
  data() {
    return {
      // selectedOptions: [],
      subjectList: [
        {
          children: []
        }
      ],
      sortValue: [],
      sortOptions: [
        {
          value: 0,
          label: "默认"
        },
        {
          value: 1,
          label: "难度从高到底"
        },
        {
          value: 2,
          label: "难度从低到高"
        },
        {
          value: 3,
          label: "通过率从高到低"
        },
        {
          value: 4,
          label: "通过率从低到高"
        },
        {
          value: 5,
          label: "评分从高到低"
        },
        {
          value: 6,
          label: "评分从低到高"
        }
      ],
      ChooseList: ["A", "B", "C", "D"],
      LevelList: [],
      labelPosition: "right",
      options: [
        {
          value: "选项0",
          label: "默认"
        },
        {
          value: "选项1",
          label: "难度从高到底"
        },
        {
          value: "选项2",
          label: "难度从低到高"
        },
        {
          value: "选项3",
          label: "通过率从高到低"
        },
        {
          value: "选项4",
          label: "通过率从低到高"
        },
        {
          value: "选项5",
          label: "评分从高到低"
        },
        {
          value: "选项6",
          label: "评分从低到高"
        }
      ],
      value8: "",
      value1: true,
      value2: true,
      picurl: "",
      activeName: "first",
      activeName2: "3",
      search: "",
      form: {
        name: "",
        questionType: "",
        difficulty: "",
        answer: "",
        answerX: "",
        projectType: "",
        title: "",
        inputA: "",
        inputB: "",
        inputC: "",
        inputD: "",
        date1: "",
        date2: "",
        delivery: false,
        types: "",
        type: "",
        topic: "",
        resource: "",
        desc: ""
      },
      flag: 1,
      formLabelWidth: "120px",
      dialogFormVisible: false, //添加表单
      dialogFormVisible1: false, //修改表单
      dialogImageUrl: "", //图片地址
      dialogVisible: false, //图片上传
      total: null, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      currentPageMy: 1, //默认开始页面
      questionId: null,
      istag: true,
      input: "",
      loading: true,
      status: null,
      // search: "",
      updateForm: {
        topic: "",
        classifyName: "",
        difficulty: "",
        types: "",
        questionId: "",
        subjectId: null,
        answerList: [{ answerMain: "" }],
        classifyId: "",
        difficulty: "",
        // selectData:false,
        questionA: "",
        questionB: "",
        questionC: "",
        questionD: "",
        picurl: ""
      },
      formLabelWidth: "120px",
      tableData: [
        {
          topic: "",
          truePro: "",
          difficulty: "",
          questionSocre: ""
        }
      ],
      tableMyData: [
        {
          topic: "",
          truePro: "",
          difficulty: "",
          questionSocre: ""
        }
      ],
      subjectOptProp: {
        value: "subjectId",
        children: "children",
        label: "subjectName"
      }
    };
  },
  mounted() {
    //自动加载
    this.getList();
    this.getMyList();
    this.getQuestionDetail();
    // this.updQuestionDetail();
    this.getSubjects();
    this.getLevel();
    this.searchData();
    this.sortSearch();
  },
  methods: {
    //全部题库
    async getList() {
      let param = {
        pageNo: this.currentPage, //第几页
        pageSize: this.pagesize, //每页多少条
        prohibit: 1
      };
      let res = await cdService.getAllData(param);
      this.status = 1;
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
        this.loading = false;
        this.total = res.totalRecord;
        this.tableData = res.data;

        console.log(res, "res1111111111111212121");
        console.log(res.totalRecord, "res.data.totalRecord");
      }
      console.log(res.data, "res1111111111111");
    },
    //我的题库
    async getMyList() {
      this.paginationShow = false;
      let param = {
        pageNo: this.currentPageMy, //第几页
        pageSize: this.pagesize, //每页多少条
        prohibit: 1,
        userId: 1
      };

      let res = await cdService.getAllData(param);
      if (res) {
        this.status = 3;
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
        this.loading = false;
        this.tableMyData = res.data;
        this.total = res.totalRecord;
        this.paginationShow = true;
        console.log(res, "res");
        console.log(res.data.questionId, "question");
      }
      console.log(res.data, "res.data");
    },
    async add() {
      this.dialogFormVisible = true;
    },
    //按排序搜索
    async sortSearch() {
      let param = {
        pageNo: this.currentPage, //第几页
        pageSize: this.pagesize, //每页多少条
        prohibit: 1,
        sort: this.sortValue
      };
      let res = await cdService.getAllData(param);
      if (res) {
        this.status = 4;
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

        this.tableData = res.data;
        this.loading = false;
        this.total = res.totalRecord;
        console.log(this.value, "排序中的value值");
        console.log(res, "res");
        console.log(res.data, "排序出表格中的数据");
      }
    },
    //获取难度等级
    async getLevel() {
      let res = await cdService.getAllLevel();
      this.LevelList = [];
      if (res.code === 200) {
        this.LevelList = res.data;
        console.log(this.LevelList, "获取级别");
      }
    },

    //获取科目
    async getSubjects(type, data) {
      // let param = {
      //   subjectName: this.label,
      // }
      let res = await cdService.getAllSubject();
      this.subjectList = [];
      if (res.code === 200) {
        for (let item of res.data) {
          item.children = [];
          let children = item.sortList;
          for (let i of children) {
            let child = {
              subjectId: i.sortId,
              subjectName: i.sortName
            };
            item.children.push(child);
          }
        }
        this.subjectList = res.data;
        console.log(this.subjectList, "获取所有科目");
      }
    },

    handlesuccess(res, file) {
      if (res.code) {
        this.picurl = res.data;
        console.log(this.picurl, "res111111111111");
      }
    },
    //新增面试题
    async handleAdd() {
      let param = {
        answerList: {
          answerMain: this.form.answer
        },
        author: {
          userId: 1
        },
        classifyId: this.activeName2,
        difficulty: this.form.type,
        questionPic: this.picurl,
        questionA: this.form.inputA,
        questionB: this.form.inputB,
        questionC: this.form.inputC,
        questionD: this.form.inputD,

        sort: {
          sortId: this.form.types[1]
        },
        subject: {
          subjectId: this.form.types[0]
        },
        topic: this.form.topic
      };
      let res = await cdService.addQuestion(param);
      this.dialogFormVisible = false;
      if (res.code === 200) {
        console.log("添加试题成功");
        console.log(res.data, "添加试题");
      }
      this.getMyList();
    },
    open5() {
      this.$alert("<strong>这是 <i>HTML</i> 片段</strong>", "HTML 片段", {
        dangerouslyUseHTMLString: true
      });
    },

    //点击修改
    async getQuestionDetail(row) {
      let param = {
        questionId: row.questionId
      };

      let res = await cdService.clickUpd(param);

      if (res) {
        console.log(res, "题目详情");
        this.updateForm = res.data;
        this.updateForm.picurl = res.data.questionPic;
        this.updateForm.sortId = [
          res.data.subject.subjectId,
          res.data.sort.sortId
        ];
        console.log(res, "修改题的res");
        //  console.log(this.updateForm.subjectArr, "修改题的类型");
      }

      this.dialogFormVisible1 = true;
      console.log(res.data.questionPic, "修改题的图片吗");
      console.log(res.data, "修改题的res.data");
      console.log(res.data.questionId, "修改题的res.data.questionId");
    },
    //提交修改试题
    async updQuestionDetail(updateForm) {
      console.log(this.updateForm, "this.updateForm");
      let param = {
        answerList: {
          answerMain: this.updateForm.answerList.answerMain
        },
        author: {
          userId: 1
        },
        classifyId: this.updateForm.classifyId,
        difficulty: this.updateForm.difficulty,
        questionPic: this.picurl,
        questionA: this.updateForm.questionA,
        questionB: this.updateForm.questionB,
        questionC: this.updateForm.questionC,
        questionD: this.updateForm.questionD,
        questionId: this.updateForm.questionId,
        sort: {
          // sortId: this.updateForm.types[1]
          sortId: this.updateForm.sortId[1]
        },

        subject: {
          subjectId: this.updateForm.sortId[0]
          //subjectId: this.updateForm.subject.subjectId
        },
        topic: this.updateForm.topic
      };
      // let flag = false;
      // console.log("this.subjectList:",this.subjectList);
      // for(let i of this.subjectList){
      //   let sortList = i.sortList;
      //   console.log("sortList:",sortList);
      //   for(let k of sortList){
      //     if(k.sortId === this.updateForm.sortId){
      //       param.subject.subjectId = i.subjectId;
      //       flag = true;
      //       break;
      //     }
      //   }
      //   if(flag){
      //     break;
      //   }
      // }

      let res = await cdService.updQuestion(param);
      if (res) {
        console.log(res + "类型怎么弄呀");
      }

      this.dialogFormVisible1 = false;
      this.getMyList();

      this.$message({
        type: "success",
        message: "修改成功!"
      });
    },
    //修改取消
    cancel() {
      this.dialogFormVisible1 = false;
      this.$message({
        type: "info",
        message: "已取消修改"
      });
    },
    //搜索功能
    async searchData() {
      let param = {
        pageNo: this.currentPage, //第几页
        pageSize: this.pagesize, //每页多少条
        prohibit: 1,
        key: this.input
      };
      let res = await cdService.getAllData(param);
      if (res) {
        this.status = 2;
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

        this.tableData = res.data;
        this.loading = false;
        this.total = res.totalRecord;
        console.log(res, "res");
        console.log(res.data, "搜索表格中的数据");
      }
    },
    // refresh(){
    //     this.$router.go(this.getList(res))
    // },
    //跳转页面详情
    toPage(row) {
      console.log(row);
      this.$router.push({
        name: "paperDetails",
        params: { questionId: row.questionId }
      });
    },
    //题库分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      if (this.status == 1) {
        this.pagesize = val;
        this.getList();
      } else if (this.status == 2) {
        this.searchData();
      } else if (this.status == 4) {
        this.sortSearch();
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.status == 1) {
        this.getList();
      } else if (this.status == 2) {
        this.searchData();
      } else if (this.status == 4) {
        this.sortSearch();
      }
    },
    handleSelectionChange(val) {
      this.pagesize = val;
      this.getList();
      console.log(val + 12123);
    },
    //我的分页
    handleSizeChangeMy(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
        this.getMyList();
    },
    handleCurrentChangeMy(val) {
      console.log(`当前页: ${val}`);
      this.currentPageMy = val;
        this.getMyList();
    },
    handleSelectionChangeMy(val) {
      this.pagesize = val;
      this.getMyList();
      console.log(val + 12123);
    },
    //全部和我的标签页
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClick1(tab, event) {
      console.log(tab, event);
    },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //表格居中
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "text-algin:center";
    },
    rowClass({ row, rowIndex }) {
      return "table-th";
    }
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

