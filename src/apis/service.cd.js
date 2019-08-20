import request from '../lib/request'

export default {
  //用户获取未被禁用的题
  getAllData: (param) => {
    return request.get('/question/get/unprohibit', param)
  },
  //管理员获取所有试题
  adminGetAllData: (param) => {
    return request.get('/question/get/all', param)
  },
  // //用户获取自己添加过的所有题
  // getMyData: (param) => {
  //   return request.get('/question/get/my', param)
  // },
  // //管理员获取自己添加过的题
  // adminGetMyData: (param) => {
  //   return request.get('/question/get/admin/my', param)
  // },
  //首页获取所有科目
  getSubject: () => {
    return request.get('/subject/get/all')
  },
  getSubjectList: (param) => {
    return request.get('/question/get/by/subject', param)
  },
  //点击修改-获取内容到表单中
  clickUpd: (param) => {
    return request.get('/question/get/info', param)
  },
  //修改题
  updQuestion: (param) => {
    return request.post('/question/update', param)
  },
  //新增题
  addQuestion: (param) => {
    return request.post('/question/add/', param)
  },
  //所有科目
  getAllSubject: (param) => {
    return request.get('/subject/get/all', param)
  },
  //难度等级
  getAllLevel: (param) => {
    return request.get('/difficulty/get', param)
  },
  //图片地址
  upImage: (param) => {
    return request.get('/upload/image', param)
  },
  //用户题库搜索
  searchData: (param) => {
    return request.get('/question/search', param)
  },
  //问题详情
  getQuestionDetail: (param) => {
    return request.get('/question/get/info', param)
  },
  //禁用
  getProhibit: (param) => {
    return request.get('/question/prohibition', param)
  },
  //增加科目
  addSubject: (param) => {
    return request.post('/subject/add', param)
  },
  //科目详情
  SubjectDetail: (param) => {
    return request.get('/subject/get/by/id', param)
  },
  //修改科目
  updSubject: (param) => {
    return request.post('/subject/update', param)
  },
  // 删除科目
  deleteSubject: (param) => {
    return request.get('/subject/delete/by/id', param)
  },
  //获取通过率最高和最低前10 
  tableList: (param) => {
    return request.get('/statistics/top', param)
  },
  //面试题评分
  scoreQuestion: (param) => {
    return request.post('/question/add/score', param)
  },
  //获取热门标签
  hotSort: (param) => {
    return request.get('/subject/get/hot/sort', param)
  },
  //根据科目id查询小分类
  getSort: (param) => {
    return request.get('/subject/get/subject/sort', param)
  },
  //新增分类
  addSort: (param) => {
    return request.get('/subject/add/sort', param)
  },
  // 点击修改分类
  clickUpdSort: (param) => {
    return request.get('/subject/get/sort/by/id', param)
  },
  //修改分类
  updSort: (param) => {
    return request.post('/subject/update/sort', param)
  },
  // 删除小分类
  deleteSort: (param) => {
    return request.get('/subject/delete/sort', param)
  },
  // //增加分类
  // addSort: (param) => {
  //   return request.get('/subject/add/sort', param)
  // },
  //用户列表
  getAllUser: (param) => {
    return request.get('/user/get/all/by/type', param)
  },
  //删除用户
  deleteUser: (param) => {
    return request.get('/user/delete', param)
  },
  //随机生成试卷
  generatePage: (param) => {
    return request.get('/testpaper/add/random', param)
  },
  //试卷列表
  getPaperList: (param) => {
    return request.get('/testpaper/get/page', param)
  },
  //试卷详情
  getPaperDetail: (param) => {
    return request.get('/testpaper/get/info', param)
  },
  //导出试卷
  exportPaper: (param) => {
    return request.get('/testpaper/export', param)
  },
  //管理员登录
  adminLogin:(param) =>{
    return request.post('/user/login',param)
  },
  //添加会员
  addUser:(param) =>{
    return request.post('/user/register',param)
  },
}

