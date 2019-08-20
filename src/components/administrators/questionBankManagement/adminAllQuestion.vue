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
            <div class="subtitle">试题小库</div>
            <div class="question-px">
              <el-select v-model="value8" filterable placeholder="请选择">
                <el-option
                  @click.native="sortSearch()"
                  v-for="item in options || []"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>

            <div class="search">
              <el-input placeholder="请输入你想搜索的内容" v-model="input3"  @keyup.enter.native="searchData()"
                        class="searchClass">
                <el-button slot="append" icon="el-icon-search" @click.native="searchData()"></el-button>
              </el-input>
            </div>

            <div class="add">
              <el-button type="text" @click="add">添加</el-button>
            </div>

            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部" name="first">
                <el-table
                  :data="tableData"
                  @selection-change="handleSelectionChange"
                  align="center"
                  stripe
                  style="width: 100%"
                  :default-sort="{prop: 'date', order: 'descending'}"
                >
                  <el-table-column label="#" type="index" width="100"></el-table-column>
                  <el-table-column label="题目" prop="topic" width="350">
                    <template slot-scope="{row}">
                      <span  v-html="row.topic" @click="toPage(row)" style="cursor:pointer;color:#40a6ff">{{row.topic}}</span>
                    </template>
                    <!--                    <template slot-scope="scope">-->
                    <!--                      <div  v-for="item in queId" @click="toPage(item)" style="cursor:pointer;color:#40a6ff">-->
                    <!--                        <span size="medium">{{scope.row.topic}}</span>-->
                    <!--                      </div>-->
                    <!--                    </template>-->
                  </el-table-column>
                  <el-table-column label="通过率" prop="truePro" width="180">
                    <template slot-scope="scope">
                      <div slot="reference">
                        <span size="medium">{{scope.row.truePro}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="评分" prop="questionSocre" width="180">
                    <template slot-scope="scope">
                      <div slot="reference">
                        <span size="medium">{{scope.row.questionSocre}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="难度" prop="difficulty" width="150">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <el-tag
                          v-html="scope.row.difficulty"
                          size="medium"
                          :type="scope.row.difficulty=='初级'? 'success': scope.row.difficulty=='中级'?'warning':'danger'"
                          effect="dark"
                        >{{ scope.row.difficulty }}
                        </el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="禁用" prop="name" width="100">
                    <template slot-scope="{row}">
                      <el-switch
                        @click.native="prohibit(row)"
                        v-model="row.choose"
                        active-color="#13ce66"
                        inactive-color="#aaaaaa"
                      ></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button type="text" @click.native="getQuestionDetail(scope.row)">
                        修改
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pagesize"
                  layout="total, sizes,prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </el-tab-pane>

              <el-tab-pane label="我的" name="second">
                <el-table
                  :data="tableMyData"
                  @selection-change="handleSelectionChangeMy"
                  align="center"
                  stripe
                  style="width: 100%"
                  :default-sort="{prop: 'date', order: 'descending'}"
                >
                  <el-table-column label="#" type="index" width="100"></el-table-column>
                  <el-table-column label="题目" prop="topic" width="350">
                    <template slot-scope="{row}">
                      <span  v-html="row.topic" @click="toPage(row)" style="cursor:pointer;color:#40a6ff">{{row.topic}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="通过率" prop="truePro" width="180">
                    <template slot-scope="scope">
                      <div slot="reference">
                        <span size="medium">{{scope.row.truePro}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="评分" prop="questionSocre" width="180">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <span size="medium" style="text-align:center">{{ scope.row.questionSocre }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="难度" prop="difficulty" width="150">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <el-tag
                          size="medium"
                          :type="scope.row.difficulty=='初级'? 'success': scope.row.difficulty=='中级'?'warning':'danger'"
                          effect="dark"
                        >{{ scope.row.difficulty }}
                        </el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="禁用" prop="name" width="100">
                    <template slot-scope="{row}">
                      <el-switch
                        @click.native="prohibit(row)"
                        v-model="row.choose"
                        active-color="#13ce66"
                        inactive-color="#aaaaaa"
                      ></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button type="text" @click="dialogFormVisible1 = true">修改</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  background
                  @size-change="handleSizeChangeMy"
                  @current-change="handleCurrentChangeMy"
                  :current-page="currentPage"
                  :page-size="pagesize"
                  layout="total, sizes,prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </el-tab-pane>
            </el-tabs>

            <!-- 添加弹出框 -->
            <el-dialog title="添加" :visible.sync="dialogFormVisible">
              <el-tabs v-model="activeName2" type="card" @tab-click="handleClick1">
                <el-tab-pane label="填空题" name="3">
                  <el-form :model="form">
                    <el-form-item label="难 度" :label-width="formLabelWidth" prop="type">
                      <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                          v-for="item in LevelList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
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
                        <img width="100%" :src="dialogImageUrl" alt/>
                      </el-dialog>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="选择题" name="1">
                  <el-form :model="form">
                    <el-form-item label="难 度" :label-width="formLabelWidth">
                      <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                          v-for="item in LevelList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
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
                        <el-option
                          v-for="item in ChooseList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
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
                        <img width="100%" :src="dialogImageUrl" alt/>
                      </el-dialog>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="编程题" name="5">
                  <el-form :model="form">
                    <el-form-item label="难 度" :label-width="formLabelWidth">
                      <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                          v-for="item in LevelList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
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
                        <img width="100%" :src="dialogImageUrl" alt/>
                      </el-dialog>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" :plain="true" @click="cr">确 定</el-button>
              </div>
            </el-dialog>

            <!--修改弹框-->
            <el-dialog title="修改" :visible.sync="dialogFormVisible1">
              <el-form :model="updateForm" ref="update">
                <el-form-item label="题型" :label-width="formLabelWidth">
                  <el-select v-model="updateForm.classifyName" disabled>
                    <el-option label="选择题" name="1" value="select"></el-option>
                    <el-option label="填空题" name="3" value="gapFilling"></el-option>
                    <el-option label="编程题" name="5" value="code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="难度" :label-width="formLabelWidth">
                  <el-select v-model="updateForm.difficulty" placeholder="1">
                    <el-option v-for="item in LevelList" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth" prop="types">
                  <el-cascader
                    v-model="updateForm.sortId"
                    placeholder="请选择"
                    :options="subjectList"
                    :props="subjectOptProp"
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="题目" :label-width="formLabelWidth">
                  <el-input v-model="updateForm.topic" type="textarea" :rows="5" placeholder="请输入题目"
                            autocomplete="off"></el-input>
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
                  <el-input v-model="updateForm.answerList.answerMain" type="textarea" :rows="5" placeholder="请输入答案"
                            autocomplete="off"></el-input>
                </el-form-item>
                <!-- 图片上传 -->
                <el-form-item label="图片" :label-width="formLabelWidth">
                  <el-upload
                    v-model="updateForm.picurl"
                    action="http://192.168.1.199:8081/upload/image"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handlesuccess"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="updateForm.questionPic" alt="">
                  </el-dialog>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="updQuestionDetail()">确 定</el-button>
              </div>
            </el-dialog>

            <!--禁用-->
            <el-dialog title="禁用原因" :visible.sync="dialogFormVisible2">
              <el-form :model="prohibitForm">
                <el-form-item label="原因" :label-width="formLabelWidth">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="prohibitForm.textarea"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <!--                <el-button @click="dialogFormVisible2 = false">取 消</el-button>-->
                <el-button type="primary" @click="sure()">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import cdService from "@/apis/service.cd";
  import {callbackify} from "util";

  export default {
    name: "allQuestion",
    data() {
      return {
        flag: 1,
        prohibitId: "",
        value1: null,
        value2: null,
        textarea: "",
        queId: [],
        dataid: "",
        selectedOptions: [],
        subjectList: [
          {
            children: []
          }
        ],
        ChooseList: ["A", "B", "C", "D"],
        LevelList: [],
        labelPosition: "right",
        options: [
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
        value8: "",
        value5: " ",
        status: null,
        picurl: "",
        activeName: "first",
        activeName2: "3",
        dialogFormVisible2: false,
        dialogFormVisible: false, //添加表单
        dialogFormVisible1: false, //修改表单
        dialogImageUrl: "", //图片地址
        dialogVisible: false, //图片上传
        total: 1000, //默认数据总数
        pagesize: 10, //每页的数据条数
        currentPage: 1, //默认开始页面
        istag: true,
        input3: "",
        search: "",
        prohibitForm: {
          textarea: ""
        },
        updateForm: {
          topic: "",
          questionPic: '',
          classifyName: "",
          difficulty: "",
          types: "",
          questionId: "",
          subjectId: null,
          answerList: [{answerMain: ""}],
          classifyId: "",
          questionA: "",
          questionB: "",
          questionC: "",
          questionD: "",
          picurl: ""
        },
        form: {
          name: "",
          region: "",
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
      this.getList();
      this.getSubjects();
      this.getLevel();
      this.getMyList();
      this.searchData();
      this.sortSearch();
      // this.prohibit();
    },
    methods: {
      //按排序搜索
      async sortSearch() {
        let param = {
          pageNo: this.currentPage, //第几页
          pageSize: this.pagesize, //每页多少条
          sort: this.value8
        };
        let res = await cdService.adminGetAllData(param);
        if (res) {
          this.status=4;
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
      //搜索功能
      async searchData() {
        let param = {
          pageNo: this.currentPage, //第几页
          pageSize: this.pagesize, //每页多少条
          key: this.input3
        };
        let res = await cdService.adminGetAllData(param);
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
      //点击添加
      async add() {
        this.dialogFormVisible = true;
      },
      //获取级别
      async getLevel() {
        let se = await cdService.getAllLevel();
        this.LevelList = [];
        if (se.code === 200) {
          this.LevelList = se.data;
          console.log(this.LevelList, "获取级别");
        }
      },
      //获取科目
      async getSubjects() {
        let se = await cdService.getAllSubject();
        this.subjectList = [];
        if (se.code === 200) {
          for (let item of se.data) {
            item.children = [];
            let children = item.sortList;
            for (let i of children) {
              let child = {
                subjectId: i.sortId,
                subjectName: i.sortName
              };
              item.children.push(child);
            }

            this.subjectList = se.data;
            console.log(this.subjectList, "获取所有科目");
          }
        }
      },
      //获取图片地址
      handlesuccess(res, file) {
        if (res.code) {
          this.picurl = res.data;
          console.log(this.picurl, "res111111111111");
        }
      },
      //添加试题
      async cr() {
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

        if (res.code === 200) {
          console.log("添加试题成功");
          console.log(res.data, "添加试题");
          this.$message({
            message: "恭喜你，添加成功",
            type: "success"
          });
        } else {
          this.$message.error("错了哦，请填写相应信息再添加");
        }
      },
      // 禁用
      async prohibit(row) {
        this.dialogFormVisible2 = true;
        this.prohibitId = row.questionId;
      },
      async sure() {
        this.dialogFormVisible2 = false;
        let pid = this.prohibitId;
        let param = {
          questionId: pid,
          peason: this.prohibitForm.textarea
        };
        console.log(pid, "禁用面试题id");
        let res = await cdService.getProhibit(param);
        if (res.code === 200) {
          console.log("禁用成功");
        }
      },

      // //点击修改
      async getQuestionDetail(row) {
        this.dialogFormVisible1 = true;
        let param = {
          questionId: row.questionId
        };

        let res = await cdService.clickUpd(param);

        if (res) {
          console.log(res, "题目详情");
          this.updateForm = res.data;
          this.updateForm.sortId = [
            res.data.subject.subjectId,
            res.data.sort.sortId
          ];
          // this.dialogImageUrl=res.data.questionPic
        }
        console.log(res.data.questionPic, "修改图片获取");
        console.log(this.updateForm.sortId, "修改题的类型科目");
        console.log(res.data.questionId, "修改题的res.data.questionId");
      },
      //修改试题
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
        let res = await cdService.updQuestion(param);
        if (res.code === 200) {
          this.dialogFormVisible1 = false;
          this.getList();
          this.$message({
            type: "success",
            message: "修改成功!"
          });

        }

      },
      cancel() {
        this.dialogFormVisible1 = false;
        this.$message({
          type: "info",
          message: "已取消修改"
        });
      },

      async getMyList() {
        let param = {
          pageNo: this.currentPage,
          pageSize: this.pagesize,
          sort: 0,
          userId: 1
        };
        let res = await cdService.adminGetAllData(param);
        if (res) {
          for (let item of res.data) {
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
          this.paginationShow = true;
          this.tableMyData = res.data;
          console.log(res, "获取管理员添加的题列表");
          for (let i of this.tableMyData) {
            this.$set(i, "choose", i.prohibitInfo.prohibitId === 1);

          }
        }
      },


      async getList() {
        let param = {
          pageNo: this.currentPage, //第几页
          pageSize: this.pagesize, //每页多少条
          sort: 0,
        };

        let res = await cdService.adminGetAllData(param);
          this.status = 1;
        if (res) {
          for (let item of res.data) {//判断
            this.dataid = item.questionId;
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
          this.paginationShow = true;
          this.tableData = await res.data;
          console.log('this.tableData', this.tableData)
          for (let i of this.tableData) {
            this.$set(i, 'choose', i.prohibitInfo.prohibitId === 1)
          }
        }
        console.log(res, "获取所有试题列表");

      },

      toPage(row) {
        console.log(row);
        this.$router.push({
          name: "adminQuestionDetail",
          params: {questionId: row.questionId}
        });
      },

      //题库分页
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      //   this.pagesize = val;
      //   this.getList();
      // },
      // handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      //   this.currentPage = val;
      //   this.getList();
      // },
      // handleSelectionChange(val) {
      //   this.pagesize = val;
      //   this.getList();
      //   console.log(val + 12123);
      // },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
          this.pagesize = val;
        if (this.status == 1) {
          this.getList();
        } else if (this.status == 2) {
          this.searchData();
        }else if (this.status == 4) {
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
        }else if (this.status == 4) {
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
        this.currentPage = val;
        this.getMyList();
      },
      handleSelectionChangeMy(val) {
        this.pagesize = val;
        this.getMyList();
        console.log(val + 12123);
      },
      handleChange(value) {
        console.log(value);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleClick1(tab, event) {
        console.log(tab, event);
      },
      // 图片上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
        console.log("图片移除");
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log("图片放大");
      },

      deleteRow(index, rows) {
        rows.splice(index, 1);
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
    text-align: center;
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
    height: 97%;
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

  .add {
    float: right;
    right: 50px;
    bottom: 65px;
    position: relative;
    /* top: 10px;*/
    /* margin-top: -20px;  */
    z-index: 2;
  }

  .search {
    width: 30%;
    z-index: 2;
  }

  .searchClass {
    z-index: 2;
  }

  .el-table {
    max-width: 100%;
  }

  .question-px {
    margin-left: 200px;
    margin-top: -30px;
    position: relative;
    top: 45px;
    right: 450px;
    z-index: 2;
  }

  .choose-input {
    /* width: 93%; */
  }

</style>
<style>
  .el-table .cell{
    padding: 0 20px;
    overflow: hidden; /*设置超出的部分进行影藏*/
    text-overflow: ellipsis; /*设置超出部分使用省略号*/
    white-space: nowrap; /*设置为单行*/
    text-align: left;
  }
  .el-textarea__inner {
    width: 93%;
    height: 70px;
  }

  .el-dialog__body {
    padding-top: 60px;
    text-align: left;
  }

  .el-input__inner {
    height: 33px;
  }

  .el-tabs__header {
    margin: -53px 44px 13px;
  }

  .el-menu-item-group__title {
    padding: 0px !important;
  }

  .el-header {
    height: 80px !important;
    border-bottom: 1px solid #d6dfef;
  }

  .el-icon-plus {
    font-size: 20px;
    font-weight: bold;
  }

  .el-table td,
  .el-table th {
    text-align: center;
  }
</style>


