import React, { memo, useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { headerMenuList } from "@/config/home";
import { HeaderMenuWrapper } from "./style";
import { getBgMusicId } from "@/api/home";
export default memo(function HeaderMenu() {
  const [musicId, setmusicId] = useState("");
  useEffect(() => {
    getBgMusicId().then((res) => {
      console.log("getBgMusicId", res);
      setmusicId(res.musicId);
    });
  }, []);
  const musicUrl = useMemo(
    () =>
      `//music.163.com/outchain/player?type=2&id=${musicId}&auto=0&height=32`,
    [musicId]
  );
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
        src={musicUrl}
      ></iframe>
    </HeaderMenuWrapper>
  );
});
