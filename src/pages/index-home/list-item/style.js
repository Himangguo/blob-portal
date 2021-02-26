import styled from "styled-components";
export const ListItemWrapper = styled.div`
  background: #fff;
  margin-bottom: 20px;
  padding: 20px 15px 20px 20px;
  .header {
    display: flex;
    align-items: center;
    margin-bottom:10px;
    .title {
      font-size: 18px;
      color: rgba(29, 165, 122);
      cursor: pointer;
    }
  }
  .content {
    text-align: left;
    font-size: 14px;
    color: #777;
    line-height: 24px;
  }
`;
