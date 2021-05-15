import styled from "styled-components";
export const AboutWrapper = styled.div`
  .info-wrapper {
    display: flex;
    justify-content: space-around;
    .info-box {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .info-item {
        margin: 5px;
        span {
          margin-right: 2px;
        }
      }
      .info-avatar {
        img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
        }
      }
      .info-name {
        font-weight: bold;
        font-size: 20px;
      }
    }
    .leave-msg-box {
      width: 600px;
      .comment-box {
        .commit-submit {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px;
          background-color: #f4f5f5;
          .reply-box {
            display: flex;
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
  }
`;
