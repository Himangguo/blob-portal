import styled from "styled-components";
export const ArticleDetailWrapper = styled.div`
  padding: 20px;
  display: flex;
  background: #f4f5f5;
  .article-content {
    width: 89%;
    height: calc(100vh - 192px);
    overflow: scroll;
    background-color: #fff;
    .comment-box {
      padding: 20px;
      .commit-submit {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #f4f5f5;
        .reply-box {
          display:flex;
          .reply-name {
            color: #d56464;
          }
        }
      }
      .button-box {
        display: flex;
        align-items: center;
        margin-left: 10px;
      }
    }
  }
  .right-action {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .btn {
      width: 40px;
      height: 40px;
      background-color: #fff;
      margin-bottom: 10px;
      text-align: center;
      line-height: 42px;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        background-color: #d56464;
        color: #fff;
      }
    }
  }
`;
