import styled from "styled-components";
export const PageHeaderWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 100%;
  height: 100px;
  /* box-shadow: 0 2px 8px #f0f1f2; */
  box-sizing: border-box;
  display: flex;
  padding: 20px;
  background-color: #d56464;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 16px;
  .logo {
    img {
      width: 45px;
      height: 45px;
      margin-right: 16px;
    }
  }
  .website-name {
    font-size:25px;
  }
  .weather {
  }
`;
