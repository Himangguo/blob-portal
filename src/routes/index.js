import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

// 懒加载导入组件
const Home = lazy(() => import("@/pages/home"));
const IndexHome = lazy(() => import("@/pages/index-home"));
const ArticleList = lazy(() => import("@/pages/article-list"));
const ArticleDetail = lazy(() => import("@/pages/article-list/detail"));
const Labels = lazy(() => import("@/pages/labels"));
const About = lazy(() => import("@/pages/about"));
const LeaveMsg = lazy(() => import("@/pages/leave-msg"));
// 路由配置对象
const routes = [
  {
    path: "/",
    exact: true,
    render: () => {
      return <Redirect to="/home" />;
    },
  },
  {
    path: "/home",
    name: "首页",
    component: Home,
    routes: [
      {
        path: "/home",
        exact: true,
        render: () => {
          return <Redirect to="/home/index" />;
        },
      },
      {
        path: "/home/index",
        name: "首页列表",
        component: IndexHome,
      },
      {
        path: "/home/list",
        name: "文章列表",
        component: ArticleList,
        exact: true,
      },
      {
        path: "/home/list/detail/:id",
        name: "文章详情",
        component: ArticleDetail,
      },
      {
        path: "/home/labels",
        name: "文章标签",
        component: Labels,
      },
      {
        path: "/home/about",
        name: "关于博主",
        component: About,
      },
      {
        path: "/home/leaveMsg",
        name: "给我留言",
        component: LeaveMsg,
      },
    ],
  },
];

export default routes;
