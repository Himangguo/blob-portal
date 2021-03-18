import React, { memo, useCallback, useEffect, useState } from "react";
import ListItem from "./list-item";
import { getArticleListPage } from "@/api/home";

export default memo(function IndexHome(props) {
  const [listData, setList] = useState([]);
  const _getArticleListPage = useCallback(() => {
    getArticleListPage(0, 10).then((res) => {
      console.log("getArticleListPage", res);
      setList(res.list);
    });
  });
  useEffect(() => {
    _getArticleListPage();
  }, []);
  return (
    <div>
      <div className="home_content">
        {listData.map((item) => {
          return (
            <ListItem
              history={props.history}
              key={item.id}
              label={item.labels}
              title={item.title}
              content={item.content}
              id={item.id}
            />
          );
        })}
      </div>
    </div>
  );
});
