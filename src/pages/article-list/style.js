import styled from "styled-components";
export const ArticleListWrapper = styled.div`
  .month-box {
    padding: 20px;
    .year {
      background-color: #1da57a;
      padding-left: 5px;
      border-bottom-left-radius: 10px;
      color: #fff;
      font-size: 30px;
      font-weight: bold;
    }
    .month {
      color: #fff;
      padding-left: 5px;
      background-color: yellowgreen;
      border-bottom-left-radius: 10px;
      font-size: 24px;
      margin-left: 24px;
    }
    .article-list-box {
      margin-left: 60px;
      border-left: 2px solid #d56454;
      border-bottom: 2px solid #d56454;
      border-right: 2px solid #d56454;
      border-bottom-left-radius: 10px;
      .article-list {
        padding: 5px 20px;
        display: flex;
        margin-bottom: 5px;
        justify-content: space-between;
        .article-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #1da57a;
          font-size: 14px;
          cursor: pointer;
          margin-right: 10px;
          .lock {
              margin-left:5px;
              color:#d56454;
          }
        }
        .create-time {
            width:100px;
        }
      }
    }
  }
`;
