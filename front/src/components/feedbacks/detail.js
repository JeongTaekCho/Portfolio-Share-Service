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
import { getWriteTime } from "../../commons/getWriteTime";
import * as API from "../../api";
import { errorModal, successModal } from "../modals/AlertModal";

export default function FeedbackDetail({ feedback, user, getFeedbackDatas }) {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEditBtn = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickDeleteFeedback = async (e) => {
    e.preventDefault();
    try {
      await API.delete(`comments/${feedback._id}`);
      getFeedbackDatas();
      successModal("피드백이 삭제되었습니다.");
    } catch (err) {
      errorModal(err.message);
    }
  };

  return (
    <>
      <DetailContainer>
        <Nickname>{feedback?.name}</Nickname>
        <Content>{feedback?.content}</Content>
        <DetailFoot>
          <CreatedAt>{getWriteTime(feedback?.createdAt)}</CreatedAt>
          {user?.id === feedback?.writerId && (
            <EditAndDeleteBox>
              <DetailBtn onClick={onClickEditBtn}>{isEdit ? "취소" : "수정"} </DetailBtn>|
              <DetailBtn type="button" onClick={onClickDeleteFeedback}>
                삭제
              </DetailBtn>
            </EditAndDeleteBox>
          )}
        </DetailFoot>
      </DetailContainer>
      {isEdit && (
        <FeedbackWrite
          isEdit={isEdit}
          feedbackData={feedback}
          setIsEdit={setIsEdit}
          getFeedbackDatas={getFeedbackDatas}
        />
      )}
    </>
  );
}
