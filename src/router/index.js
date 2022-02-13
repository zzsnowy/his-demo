import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/First'
import login from '@/components/Login'
import A from '@/components/A'
import B from '@/components/B'
import User from '@/components/User'
import Dept from '@/components/Dept'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(Router)
Vue.use(VueAxios, axios)
//解决 NavigationDuplicated: Avoid redundant navigation to current location
import VueRouter from 'vue-router';
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/first',
      name: 'First',
      component: First
    },
    {
      path: '/first',
      name: '挂号收费站',
      component: First,
      hidden:true,
      children:[
        {path:'/a',name:'现场挂号',component:A},
        {path:'/b',name:'收费',component:B},
        // {path:'/a',name:'退费',component:A},
        // {path:'/b',name:'查询患者费用',component:B},
      ]
    },
    // {
    //   path: '/first',
    //   name: '门诊医生站',
    //   component: First,
    //   hidden:true,
    //   children:[
    //     // {path:'/a',name:'病例首页',component:A},
    //     // {path:'/b',name:'检查申请',component:B},
    //     // {path:'/a',name:'开立处方',component:A},
    //     // {path:'/b',name:'诊毕',component:B},
    //     // {path:'/a',name:'工作量总计',component:A},
    //   ]
    // },
    // {
    //   path: '/first',
    //   name: '医技医生站',
    //   component: First,
    //   hidden:true,
    //   children:[
    //     // {path:'/a',name:'检查登记',component:A},
    //     // {path:'/b',name:'检查结果',component:B},
    //     // {path:'/a',name:'工作量合计',component:A}
    //   ]
    // },
    // {
    //   path: '/first',
    //   name: '药房工作站',
    //   component: First,
    //   hidden:true,
    //   children:[
    //     // {path:'/a',name:'发货管理',component:A},
    //     // {path:'/b',name:'退药管理',component:B},
    //     // {path:'/a',name:'工作量统计',component:A}
    //   ]
    // },
    // {
    //   path: '/first',
    //   name: '财务管理',
    //   component: First,
    //   hidden:true,
    //   children:[
    //     // {path:'/a',name:'工作量汇总',component:A},
    //     // {path:'/b',name:'费用管理',component:B}
    //   ]
    // },
     {
      path: '/first',
      name: '系统管理',
      component: First,
      hidden:true,
      children:[
        {path:'/user',name:'用户管理',component:User},
        {path:'/dept',name:'科室管理',component:Dept},
      ]
    },
    {path:"",redirect:"/login"}
  ],
  // mode: 'history'
})
