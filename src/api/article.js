import request from "./request";
const base_url = "/moment"
// 获取文章详情
export const getrticleDetailById = (id) => {
  return request({
    method: "get",
    url: `${base_url}/detail`,
    params: {
      id,
    },
  });
};
