import React from "react";
import { FeedbackForm, FeedbackInput, FeedbackSendBtn } from "../../styles/feedbacks/write";

export default function FeedbackWrite({ isEdit }) {
  return (
    <FeedbackForm>
      <FeedbackInput type="text" placeholder="피드백을 남겨주세요." />
      <FeedbackSendBtn> {isEdit ? "수정" : "게시"}</FeedbackSendBtn>
    </FeedbackForm>
  );
}
