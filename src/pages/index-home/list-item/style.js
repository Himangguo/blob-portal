import styled from "styled-components";
export const ListItemWrapper = styled.div`
  background: #fff;
  margin-bottom: 20px;
  padding: 20px 15px 20px 20px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 142px;
  .left-wrapper {
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .title {
        font-size: 18px;
        color: rgba(29, 165, 122);
        cursor: pointer;
        margin-right: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 80vw;
      }
      .lock {
        color: #d56464;
        line-height: 8px;
      }
    }
    .content {
      text-align: left;
      font-size: 14px;
      color: #777;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 80vw;
    }
  }
  img {
    height: 100%;
    cursor: pointer;
  }
`;
