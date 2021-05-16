import React, { memo, useEffect, useState } from "react";
import ArticleRender from "@/pages/article-list/detail/article-render";
import { getArticleDetailById } from "@/api/article";
export default memo(function Auth() {
  const [useArticle, setUseArticle] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    getArticleDetailById(43).then((res) => {
      console.log("getArticleDetailById", res);
      setUseArticle(res[0]);
    });
  },[]);
  return (
    <div>
      <ArticleRender title={useArticle.title} content={useArticle.content} />
    </div>
  );
});
