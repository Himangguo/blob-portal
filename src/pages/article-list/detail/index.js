import React, { memo, useEffect, useState } from "react";
import ArticleRender from "./article-render";

import {ArticleDetailWrapper} from "./style"

import { getrticleDetailById } from "@/api/article";
export default memo(function ArticleDetail(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    console.log(props.match.params.id);
    _getrticleDetailById(props.match.params.id);
  }, [props.match.params.id]);
  function _getrticleDetailById(id) {
    getrticleDetailById(id).then((res) => {
      console.log("getrticleDetailById", res);
      setTitle(res[0].title);
      setContent(res[0].content);
    });
  }
  return (
    <ArticleDetailWrapper>
      <ArticleRender title={title} content={content} />
    </ArticleDetailWrapper>
  );
});
