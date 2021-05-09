import React, { memo, useEffect, useState } from "react";
import { Card, Drawer, message, Button,Tooltip } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { getArticleOfLabel } from "@/api/article";
import LabelItem from "./label-item";
import { LabelWrapper } from "./style";
export default memo(function ArticleLabels(props) {
  const [visible, setVisible] = useState(false);
  const [labelList, setLabelList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  useEffect(() => {
    getArticleOfLabel().then((res) => {
      console.log("getArticleOfLabel", res.list);
      setLabelList(res.list);
    });
  }, []);

  const onClose = () => {
    setVisible(false);
  };
  const onOpenDrawer = (list) => {
    setVisible(true);
    setRenderList(list);
  };
  const onjumpMomentArticle = (item) => {
    if (item.valid) {
      props.history.push(`/home/list/detail/${item.id}`);
    } else {
      message.info("该文章已被博主隐藏，如需参考请给博主留言");
    }
  };
  return (
    <LabelWrapper>
      <Card title={`文章标签 ${labelList.length}`}>
        <div style={{ display: "flex" }}>
          {labelList.map((item) => {
            return (
              <LabelItem label={item} key={item.id} openDrawer={onOpenDrawer} />
            );
          })}
        </div>
      </Card>
      <Drawer
        title="文章"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {renderList.map((item) => {
          return (
            <Button type="primary" onClick={() => onjumpMomentArticle(item)}>
              <Tooltip title={item.title}>
                <span
                  style={{
                    cursor: "pointer",
                    width: "180px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                  <span>{item.valid ? "" : <LockOutlined />}</span>
                </span>
              </Tooltip>
            </Button>
          );
        })}
      </Drawer>
    </LabelWrapper>
  );
});
