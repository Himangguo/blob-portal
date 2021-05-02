import React, { memo, useEffect, useState,useCallback } from "react";
import {message} from "antd";
import moment from "moment";
import { LockOutlined } from "@ant-design/icons";
import { ArticleListWrapper } from "./style";
import { getOrderList } from "@/api/article";
export default memo(function ArticleList(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    getOrderList().then((res) => {
      console.log("getOrderList", res.list);
      setList(res.list);
    });
  }, []);
  const goArticleDetail = useCallback((item) => {
    if (item.valid) {
      props.history.push(`/home/list/detail/${item.id}`);
    } else {
      message.info("该文章已被博主隐藏，如需参考请给博主留言");
    }
  }, [props]);
  return (
    <ArticleListWrapper>
      {list.map((item) => {
        return (
          <div className="month-box" key={`${item.year}_${item.month}`}>
            <div className="year">{item.year}</div>
            <div className="month" id={`${item.year}_${item.month}`}>
              {item.month}
            </div>
            <div className="article-list-box">
              {item.list.map((citem) => {
                return (
                  <div className="article-list" key={citem.id}>
                    <div className="article-name" onClick={()=>goArticleDetail(citem)}>
                      {citem.title}
                      <span className="lock">{citem.valid ? "" : <LockOutlined />}</span>
                    </div>
                    <div className="create-time">
                      {moment(citem.createTime).format("YYYY-MM-DD HH:mm")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </ArticleListWrapper>
  );
});
