import React, { memo, useState } from "react";
import { headerMenuList } from "@/config/home";
import { HeaderMenuWrapper } from "./style";
import { NavLink } from "react-router-dom";
export default memo(function HeaderMenu() {
  return (
    <HeaderMenuWrapper>
      <div className="menu-box">
        {headerMenuList.map((item, key) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="menu-item"
              activeClassName="menu-item-active"
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>

      <iframe
        frameBorder="no"
        border="0"
        marginWidth="0"
        marginHeight="0"
        width="200"
        height="52"
        src="//music.163.com/outchain/player?type=2&id=346089&auto=0&height=32"
      ></iframe>
    </HeaderMenuWrapper>
  );
});
