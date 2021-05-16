import request from "./request";
const base_url = "/moment";
// 获取文章详情
export const getArticleDetailById = (id) => {
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
export const getCommentList = (momentId,type) => {
  return request({
    method: "get",
    url: "/comment",
    params: {
      momentId,
      type
    },
  });
};

// 匿名评论
export const anonymousComment = (momentId, content, type) => {
  return request({
    method: "post",
    url: "/comment",
    data: {
      momentId,
      content,
      type
    },
  });
};

// 实名评论
export const realNameComment = (momentId, content, userId,type) => {
  return request({
    method: "post",
    url: "/comment",
    data: {
      momentId,
      content,
      userId,
      type
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
export const replyToCommentById = (momentId, content, commentId, userId,type) => {
  if (userId) {
    return request({
      method: "post",
      url: `/comment/${commentId}/reply`,
      data: {
        momentId,
        content,
        userId,
        type
      },
    });
  } else {
    return request({
      method: "post",
      url: `/comment/${commentId}/reply`,
      data: {
        momentId,
        content,
        type
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

export const getArticleOfLabel = ()=>{
  return request({
    method:"get",
    url:"/label/labelToArticle"
  })
}