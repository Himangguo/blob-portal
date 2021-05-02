import request from "./request";
const base_url = "/moment";
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

// 给文章点赞
export const thumbsupById = (momentId) => {
  return request({
    method: "post",
    url: `${base_url}/thumbsup`,
    data: {
      momentId,
    },
  });
};

// 获取评论列表
export const getCommentList = (momentId) => {
  return request({
    method: "get",
    url: "/comment",
    params: {
      momentId,
    },
  });
};

// 匿名评论
export const anonymousComment = (momentId, content) => {
  return request({
    method: "post",
    url: "/comment",
    data: {
      momentId,
      content,
    },
  });
};

// 实名评论
export const realNameComment = (momentId, content, userId) => {
  return request({
    method: "post",
    url: "/comment",
    data: {
      momentId,
      content,
      userId,
    },
  });
};
// 实名校验
export const verifyIdentity = (name, password) => {
  return request({
    method: "post",
    url: "/verify",
    data: {
      name,
      password,
    },
  });
};

// 回复评论
export const replyToCommentById = (momentId, content, commentId, userId) => {
  if (userId) {
    return request({
      method: "post",
      url: `/comment/${commentId}/reply`,
      data: {
        momentId,
        content,
        userId,
      },
    });
  } else {
    return request({
      method: "post",
      url: `/comment/${commentId}/reply`,
      data: {
        momentId,
        content,
      },
    });
  }
};

// 获取年月结构的文章列表
export const getOrderList = () => {
  return request({
    method: "get",
    url: `/moment/getOrderList`,
  });
};
