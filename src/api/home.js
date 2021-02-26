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
