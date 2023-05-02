import React from "react";
import { FeedBackContainer, FeedbackMent, FeedbackTitle } from "../../styles/feedbacks/feedback";
import FeedbackDetail from "./detail";
import FeedbackWrite from "./write";

export default function Feedback() {
  return (
    <FeedBackContainer>
      <FeedbackTitle>포트폴리오 피드백</FeedbackTitle>
      {<FeedbackDetail /> || (
        <FeedbackMent>
          피드백이 없습니다😂
          <br />
          땅오님을 위한 피드백을 작성해주세요!!
        </FeedbackMent>
      )}
      <FeedbackWrite />
    </FeedBackContainer>
  );
}
