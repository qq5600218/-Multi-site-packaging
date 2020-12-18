import Vue from 'vue'
import Router from 'vue-router'
/* 首页 */
const Home = resolve => require([`@/components/Home.vue`], resolve);
/* 个人中心 */
const Person = resolve => require(['@/components/Person.vue'], resolve);
/* 优惠 */
const Discount = resolve => require(['@/components/Discount.vue'], resolve);
/* 客服 */
const Service = resolve => require(['@/components/Service.vue'], resolve);
Vue.use(Router)
// role：0代表不允许试玩用户进入，1代表允许
export default new Router({
  routes: [
    // 404页面前端处理
    {
      path: '*', //匹配所有路径
      component: Home
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireLogin: false,
        role: 1
      },
    },
    {
      path: '/person',
      name: 'Person',
      meta: {
        requireLogin: true,
        role: 1
      },
      component: Person
      /*个人中心*/
    },
    {
      path: '/discount',
      name: 'Discount',
      meta: {
        requireLogin: true,
        role: 1
      },
      component: Discount
      /*优惠*/
    },
    {
      path: '/service',
      name: 'Service',
      meta: {
        requireLogin: false,
        role: 0
      },
      component: Service
      /*客服*/
    },
  ]
})
