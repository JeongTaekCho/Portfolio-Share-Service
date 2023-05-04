import { Spin } from "antd";
import styled from "styled-components";

export default function Loading() {
  return (
    <Background>
      <Spin size="large" style={{ marginLeft: "1.5rem" }}>
        <div className="content" />
      </Spin>
      <div className="text">Loading...</div>
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    margin-top: 10.5rem;
    color: #fff;
    opacity: 0.7;
  }
  .ant-spin-dot {
    margin-left: 1.5rem !important;
  }
`;
