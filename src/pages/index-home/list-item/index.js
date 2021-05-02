import React, { memo, useCallback, useEffect } from "react";
import { Tag, message, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { ListItemWrapper } from "./style";
import PropTypes from "prop-types";
import moment from "moment";
function ListItem(props) {
  const goArticleDetail = useCallback((e) => {
    e.preventDefault();
    if (props.valid) {
      props.history.push(`/home/list/detail/${props.id}`);
    } else {
      message.info("该文章已被博主隐藏，如需参考请给博主留言");
    }
  });
  const openImgLook = useCallback(() => {
    notification.open({
      message: props.title,
      description: (
        <div style={{ width: "100%", height: "80vh", overflow: "scroll" }}>
          <img
            style={{ width: "100%", marginBottom: "50px" }}
            src={props.pictures[0]}
          />
          <img style={{ width: "100%" }} src={props.pictures[1]} />
        </div>
      ),
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  }, [props.pictures]);
  return (
    <ListItemWrapper>
      <div className="left-wrapper">
        <div className="header">
          <div className="label-box">
            {props.label &&
              props.label.map((item) => {
                return (
                  <Tag key={item} color="blue">
                    {item}
                  </Tag>
                );
              })}
          </div>
          <a href="#/" onClick={goArticleDetail} className="title">
            {props.title}
          </a>
          <span className="lock">{props.valid ? "" : <LockOutlined />}</span>
        </div>
        <div className="content">{props.content}</div>
        <div className="updateTime">
          {moment(props.updateTime).format("YYYY-MM-DD HH:mm")}
        </div>
      </div>

      <img
        src={
          props.pictures &&
          (props.pictures.length === 1
            ? props.pictures[0]
            : props.pictures[Math.round(Math.random())])
        }
        alt=""
        onClick={openImgLook}
      />
    </ListItemWrapper>
  );
}
ListItem.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.array,
  valid: PropTypes.number,
  pictures: PropTypes.array,
  updateTime: PropTypes.string,
};
export default memo(ListItem);
