import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
// import Home from './views/Home.vue'
import paperList from './components/user/testPaper/paperList'
import adminQuestionDetail from './components/administrators/questionBankManagement/adminQuestionDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'systemIndex',
      component: () => import('./views/systemIndex'),
      meta: {
        footShow: false, // true显示，false隐藏
        // footShow1: false, // true显示，false隐藏
      },
    },
    ,
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login'),
    },
    {
      path: 'userIndex',
      name: 'userIndex',
      component: () => import('@/components/user/userIndex'),
      meta: {
        footShow: true, // true显示，false隐藏
        // footShow1: false, // true显示，false隐藏
      },
    },
    {
      path: 'login',
      name: 'login',
      component: Login,
      meta: {
        footShow: false, // true显示，false隐藏
        footShow1: false, // true显示，false隐藏
      },
    },
    {
      path: '/paperList',
      name: 'paperList',
      component: paperList,
      meta: {
        footShow: true, // true显示，false隐藏
        // footShow1: false, // true显示，false隐藏
      },
    },
    {
      path: '/userIndex',
      name: 'userIndex',
      component: () => import('./components/user/userIndex'),
      meta: {
        footShow: true, // true显示，false隐藏
        // footShow1: false,// true显示，false隐藏
      },
    },
    {
      path: '/systemIndex',
      name: 'systemIndex',
      component: () => import('./views/systemIndex'),
      meta: {
        footShow: true,
        // footShow1: false, // true显示，false隐藏
      },
    },
    {
      path: '/allQuestion',
      name: 'allQuestion',
      component: () => import(/* webpackChunkName: "about" */ './components/user/questionBank/allQuestion.vue'),
      meta: {
        footShow: true,
        // footShow1: false, // true显示，false隐藏
      },
    },

    {
      path: '/index',
      name: 'index',
      component: () => import('@/components/HelloWorld'),
      meta: {
        footShow: true,
        // footShow1: false, // true显示，false隐藏
      },
    },
    {
      path: '/paperType',
      name: 'paperType',
      component: () => import('./components/user/testPaper/paperType.vue'),
      meta: {
        footShow: true,
        // footShow1: false,// true显示，false隐藏
      },
    },
    {
      path: '/paperDetails',
      name: 'paperDetails',
      component: () => import('./components/user/testPaper/paperDetail.vue'),
      meta: {
        footShow: true, 
        // footShow1: false,// true显示，false隐藏
      },
    },
    {
      path: '/generatepaper',
      name: 'generatepaper',
      component: () => import('./components/user/testPaper/generatepaper.vue'),
      meta: {
        footShow: true, 
        // footShow1: false,// true显示，false隐藏
      },
    },
    {
      path: '/allPaperList',
      name: 'allPaperList',
      component: () => import('./components/user/testPaper/allPaperList.vue'),
      meta: {
        footShow: true,
        // footShow1: false, // true显示，false隐藏
      },
    },
    {
      path: '/generatepaper',
      name: 'generatepaper',
      component: () => import('./components/user/testPaper/generatepaper.vue'),
      meta: {
        footShow: true,
        // footShow1: false,// true显示，false隐藏
      },
    },
    // {
    //   path: '/allPaperList',
    //   name: 'allPaperList',
    //   component: () => import('./components/user/testPaper/allPaperList.vue'),
    //   meta: {
    //     footShow: true,
    //     // footShow1: false, // true显示，false隐藏
    //   },
    // },
    {
      path: '/dataStatistics',
      name: 'dataStatistics',
      component: () => import('./components/user/dataStatistics/dataStatistics.vue'),
      meta: {
        footShow: true,
        // footShow1: false, // true显示，false隐藏
      },
    },
    {
      path: '/userManagement',
      name: 'userManagement',
      component: () => import('./components/administrators/systemManagement/userManagement.vue'),
      meta: {
        footShow1: true, // true显示，false隐藏
        // footShow:false // true显示，false隐藏
      },
    },
    {
      path: '/membershipManagement',
      name: 'membershipManagement',
      component: () => import('./components/administrators/systemManagement/membershipManagement.vue'),
      meta: {
        footShow1: true,
        // footShow:false // true显示，false隐藏
      },
    },
    {
      path: '/additionalCategories',
      name: 'additionalCategories',
      component: () => import('./components/administrators/questionBankManagement/additionalCategories.vue'),
      meta: {
        footShow1: true,
        // footShow:false // true显示，false隐藏
      },
    },
    {
      path: '/adminAllQuestion',
      name: 'adminAllQuestion',
      component: () => import('./components/administrators/questionBankManagement/adminAllQuestion.vue'),
      meta: {
        footShow1: true,
        // footShow:false // true显示，false隐藏
      },
    },
    // {
    //   path: '/adminQuestionDetail',
    //   name: 'adminQuestionDetail',
    //   component: () => import('./components/administrators/questionBankManagement/adminQuestionDetail.vue')
    // }
    {
      path: '/adminQuestionDetail',
      name: 'adminQuestionDetail',
      component: adminQuestionDetail,
      meta: {
        footShow1: true,
        // footShow:false // true显示，false隐藏
      },
    },
    {
      path: '/addClassification',
      name: 'addClassification',
      component: () => import('./components/administrators/questionBankManagement/addClassification.vue'),
      meta: {
        footShow1: true,
        // footShow:false // true显示，false隐藏
      },
    },
    {
      path: '/paperTypes',
      name: 'paperTypes',
      component: () => import('./components/administrators/paperManagement/paperType.vue'),
      meta: {
        footShow1: true,
        // footShow:false // true显示，false隐藏
      },
    },
    {
      path: '/paperLists',
      name: 'paperList',
      component: () => import('./components/administrators/paperManagement/paperList.vue'),
      meta: {
        footShow1: true,
        // footShow:false // true显示，false隐藏
      },
    },
    {
      path: '/generatePapers',
      name: 'generatePapers',
      component: () => import('./components/administrators/paperManagement/generatePaper.vue'),
      meta: {
        footShow1: true,
        // footShow:false // true显示，false隐藏
      },
    },
    {
      path: '/paperDetail',
      name: 'paperDetail',
      component: () => import('./components/administrators/paperManagement/paperDetail.vue'),
      meta: {
        footShow1: true,
        // footShow:false // true显示，false隐藏
      },
    }
  ]
})
