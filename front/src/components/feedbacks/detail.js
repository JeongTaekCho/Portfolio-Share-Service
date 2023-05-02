import React, { useState } from "react";
import {
  Content,
  CreatedAt,
  DetailBtn,
  DetailContainer,
  DetailFoot,
  EditAndDeleteBox,
  Nickname,
} from "../../styles/feedbacks/detail";
import FeedbackWrite from "./write";

export default function FeedbackDetail() {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEditBtn = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <>
      <DetailContainer>
        <Nickname>땅오</Nickname>
        <Content>포트폴리오 너무 멋있어요 피드백이 필요가 없네요!!</Content>
        <DetailFoot>
          <CreatedAt>3일 전</CreatedAt>
          <EditAndDeleteBox>
            <DetailBtn onClick={onClickEditBtn}>{isEdit ? "취소" : "수정"} </DetailBtn>|<DetailBtn>삭제</DetailBtn>
          </EditAndDeleteBox>
        </DetailFoot>
      </DetailContainer>
      {isEdit && <FeedbackWrite isEdit={isEdit} />}
    </>
  );
}
