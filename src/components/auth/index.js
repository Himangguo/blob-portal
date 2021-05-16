import React, { memo, useEffect, useState } from "react";
import ArticleRender from "@/pages/article-list/detail/article-render";
import { getArticleDetailById } from "@/api/article";
export default memo(function Auth() {
  const [useArticle, setUseArticle] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    getArticleDetailById(54).then((res) => {
      console.log("getArticleDetailById", res);
      setUseArticle(res[0]);
    });
  },[]);
  return (
    <div style={{padding:"30px"}}>
      <ArticleRender title={useArticle.title} content={useArticle.content} />
    </div>
  );
});
