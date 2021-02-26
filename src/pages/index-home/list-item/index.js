import React, { memo, useCallback, useEffect } from "react";
import { Tag } from "antd";
import { ListItemWrapper } from "./style";
import PropTypes from "prop-types";
function ListItem(props) {
  useEffect(() => {
    console.log(props);
  }, []);
  const goArticleDetail = useCallback((e) => {
    e.preventDefault();
    props.history.push(`/home/list/detail/${props.id}`);
  });
  return (
    <ListItemWrapper>
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
      </div>
      <div className="content">{props.content}</div>
    </ListItemWrapper>
  );
}
ListItem.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.array,
};
export default memo(ListItem);
