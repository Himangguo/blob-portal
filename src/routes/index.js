import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

// 懒加载导入组件
const Home = lazy(() => import("@/pages/home"));

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
  },
];

export default routes;
