import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Space, Spin } from "antd";

export function Chat({ onClickBotBtn }) {
  const [question, setQuestion] = useState("");
  const [msgHistory, setMsgHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
          <Space style={{ margin: "20px" }}>
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
  width: 350px;
  height: 480px;
  background-color: #fff;
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  z-index: 9999;
  .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
    margin-left: -18px;
    margin-bottom: 5px;
  }
  .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    width: 310px;
    left: -98px;
    text-shadow: none;
    color: #fff;
  }
  .ant-spin .ant-spin-dot-item {
    background-color: orange;
  }
`;

const MsgBox = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 350px;
  background: linear-gradient(-135deg, rgb(200, 80, 192), rgb(65, 88, 208));
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  border-radius: 4px;
`;

const MsgForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MsgInput = styled.input`
  width: 80%;
  height: 30px;
  border: 1px solid #111;
  border-radius: 30px;
  padding: 10px;
`;

const MsgSubmit = styled.button`
  width: 50px;
  height: 100%;
  background: linear-gradient(-135deg, rgb(200, 80, 192), rgb(65, 88, 208));
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  border-radius: 4px;
  border: none;
`;

const MsgContainer = styled.div`
  width: 100%;
  display: flex;
`;

const MyMsg = styled.p`
  width: auto;
  min-height: 35px;
  background-color: #fff;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 0;
  display: flex;
`;

const ChatTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #111;
`;

const HeadBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CancelBtn = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: #111;
  border: none;
  background: none;
`;

const SpinWrap = styled.div`
  /* margin-left: ; */
`;
