import styled from "styled-components";
export const HeaderMenuWrapper = styled.div`
  width: 100vw;
  height: 52px;
  background-color: #464646;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .menu-box {
    display: flex;
    align-items: center;
    .menu-item {
      padding: 0px 20px;
      line-height: 52px;
      font-weight: 200;
      font-size: 16px;
      color:#fff;
      cursor: pointer;
      &:hover {
        background-color: #d56464;
      }
    }
    .menu-item-active {
      background-color: #d56464;
    }
  }
`;
