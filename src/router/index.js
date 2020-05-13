import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/homepage",
    component: () => import("@/views/Homepage.vue")
  },
  {
    path: "/choice",
    component: () => import("@/views/Choice.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
//以上为没有身份要求的默认路由

//----------------------
//后期追加的路由配置
let adminRoutes = [
  {
    props: true,
    path: "/welcome",
    component: () => import("@/views/Welcome.vue")
  },
  {
    path: "/students",
    component: () => import("@/views/Students.vue")
  },
  {
    path: "/directions",
    component: () => import("@/views/Directions.vue")
  },
  {
    path: "/courses",
    component: () => import("@/views/Courses.vue")
  }
];
// 必须与后端提前约定。按角色，动态加载路由信息
// 使其他角色即使知道路由路径，也无法加载对应的组件
const tutorRole = "6983f953b49c88210cb9";
const studentRole = "bb63e5f7e0f2ffae845c";

// 暴露该方法。登录后，有vuex调用，通知更新路由信息
export function updateRoutes() {
  switch (sessionStorage.getItem("role")) {
    case tutorRole:
      router.addRoutes(adminRoutes);
      break;
    case studentRole:
      // student的路由
      break;
  }
}
// 再此文件模块加载时，也执行。用户登陆后刷新页面时，按sessionstorage中数据初始化
// 没有找到sessionstorage的监听事件
updateRoutes();
