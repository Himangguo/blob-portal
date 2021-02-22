import { CHANGE_USERINFO } from "./constants";

// 修改用户信息
export const changeUserInfo = (userInfo) => ({
  type: CHANGE_USERINFO,
  userInfo,
});
