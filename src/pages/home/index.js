import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeWrapper } from "./style";
export default memo(function Home() {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.getIn(["userInfo"]),
  }));
  return (
    <HomeWrapper>
      Home---{userInfo.id}--{userInfo.name}
    </HomeWrapper>
  );
});
