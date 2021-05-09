import React, { memo,useMemo } from "react";
import { LabelItemWrapper } from "./style";
import { Tag } from "antd";
export default memo(function LabelItem(props) {
  const { label } = props;
  const color = useMemo(() => {
    const colorList = ["#f50", "#2db7f5", "#87d068", "#108ee9"];
    const index = Math.floor(Math.random() * 4);
    console.log(index);
    return colorList[index];
  });
  return (
    <LabelItemWrapper>
      <Tag color={color} style={{cursor:"pointer"}} onClick={()=>props.openDrawer(label.momentList)}>{label.name}</Tag>
      <span className="label-count"> {label.momentList.length}</span>
    </LabelItemWrapper>
  );
});
