import { Map } from "immutable";

import { CHANGE_USERINFO } from "./constants";

// 初始化state，使用immutable进行state的包裹
const initialState = Map({
  userInfo: {id:"1",name:"manguo"},
});

// 定义reducer，返回的新的state使用immutable进行优化，不需要每次更新都拷贝一遍state
function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERINFO:
      return state.set("userInfo", action.userInfo);
    default:
      return state;
  }
}

export default reducer;
