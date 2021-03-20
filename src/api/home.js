import request from "./request";
// 分页获取文章
export const getArticleListPage = (offset, size) => {
  return request({
    method: "get",
    url: "/moment/getList",
    params: {
      offset,
      size,
    },
  });
};

// 获取背景乐
export const getBgMusicId = ()=>{
  return request({
    method:"get",
    url:"/persona/music/getBgMusicId"
  })
}