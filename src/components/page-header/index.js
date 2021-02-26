import React, { memo } from "react";
import { PageHeaderWrapper } from "./style";
import logo from "@/assets/image/logo.png";
export default memo(function PageHeader(props) {
  return (
    <PageHeaderWrapper>
      <div className="logo">
        <img src={logo} alt="miao" />
        <span>Miao Blob</span>
      </div>
      <div className="website-name">{props.title}</div>
      <div className="weather"></div>
    </PageHeaderWrapper>
  );
});
