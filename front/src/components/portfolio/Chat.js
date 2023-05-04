import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { res } from "../../styles/responsive";
import { Space, Spin } from "antd";

export function Chat({ onClickBotBtn }) {
  const [question, setQuestion] = useState("");
  const [msgHistory, setMsgHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeInput = (e) => {
    setQuestion(e.target.value);
  };

  const onSubmitSend = async (e) => {
    e.preventDefault();
    try {
      setMsgHistory((prev) => {
        return [
          ...prev,
          {
            user: "user",
            message: question,
          },
        ];
      });
      setIsLoading(true);

      const bodyData = JSON.stringify({ question });

      const answer = await axios.post("http://localhost:5001/chat", bodyData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });

      setIsLoading(false);
      setMsgHistory((prev) => {
        return [
          ...prev,
          {
            user: "ai",
            message: answer?.data?.result || "곤란한 질문 입니다.",
          },
        ];
      });
      setQuestion("");
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(msgHistory);

  return (
    <ChatBox>
      <HeadBox>
        <ChatTitle>무엇이든 질문해보세요!</ChatTitle>
        <CancelBtn onClick={onClickBotBtn}>X</CancelBtn>
      </HeadBox>
      <MsgBox>
        <MsgContainer style={{ justifyContent: "flex-start" }}>
          <MyMsg>안녕하세요! 저는 AI봇입니다. 궁금한 것을 질문해주세요!</MyMsg>
        </MsgContainer>
        {msgHistory.map((el) => (
          <MsgContainer style={{ justifyContent: el.user === "user" ? "flex-end" : "flex-start" }}>
            <MyMsg style={{ justifyContent: el.user === "user" ? "flex-end" : "flex-start" }}>{el.message}</MyMsg>
          </MsgContainer>
        ))}
        {isLoading && (
          <Space className="space">
            <SpinWrap>
              <Spin tip="AI가 열심히 답변중입니다...">
                <div className="content" />
              </Spin>
            </SpinWrap>
          </Space>
        )}
      </MsgBox>
      <MsgForm>
        <MsgInput type="text" placeholder="궁금한 것을 질문해주세요." value={question} onChange={onChangeInput} />
        <MsgSubmit onClick={onSubmitSend}>전송</MsgSubmit>
      </MsgForm>
    </ChatBox>
  );
}

const ChatBox = styled.div`
  width: 35rem;
  height: 48rem;
  background-color: #fff;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1rem;
  z-index: 9999;
  .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
    margin-left: -1.8rem;
    margin-bottom: 0.5rem;
  }
  .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    width: 31rem;
    left: -9.8rem;
    text-shadow: none;
    color: #fff;
  }
  .space {
    margin: 2.3rem 0 0 2.2rem !important;
    @media ${res.tablet} {
      margin: 2.8rem !important;
    }
  }

  .ant-spin .ant-spin-dot-item {
    background-color: orange;
  }

  @media ${res.tablet} {
    width: 95%;
    height: 95vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MsgBox = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 35rem;
  background: linear-gradient(-135deg, rgb(200, 80, 192), rgb(65, 88, 208));
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  border-radius: 0.4rem;
  font-size: 1.6rem;

  @media ${res.tablet} {
    height: 75vh;
  }
`;

const MsgForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MsgInput = styled.input`
  width: 80%;
  height: 3rem;
  border: 1px solid #111;
  border-radius: 3rem;
  padding: 1rem;
  font-size: 1.8rem;
`;

const MsgSubmit = styled.button`
  width: 5rem;
  height: 100%;
  background: linear-gradient(-135deg, rgb(200, 80, 192), rgb(65, 88, 208));
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  border-radius: 0.4rem;
  border: none;
`;

const MsgContainer = styled.div`
  width: 100%;
  display: flex;
`;

const MyMsg = styled.p`
  width: auto;
  max-width: 90%;
  min-height: 3.5rem;
  background-color: #fff;
  border-radius: 1.5rem;
  padding: 1rem;
  margin-bottom: 0;
  display: flex;
  word-break: break-all;
`;

const ChatTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: #111;
`;

const HeadBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CancelBtn = styled.button`
  font-size: 1.8rem;
  font-weight: 600;
  color: #111;
  border: none;
  background: none;
`;

const SpinWrap = styled.div`
  /* margin-left: ; */
`;
