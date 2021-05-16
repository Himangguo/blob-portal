import React, { memo, useEffect } from "react";
import { message } from "antd";
import Auth from "../auth";
export default memo(function AuthController(props) {
  useEffect(() => {
    !process.env.REACT_APP_TOKEN && message.warn("请通过博客苗工具进行授权");
  }, []);
  return <div>{process.env.REACT_APP_TOKEN ? props.children : <Auth />}</div>;
});
