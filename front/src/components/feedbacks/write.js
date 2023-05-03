import React, { useEffect, useState } from "react";
import { FeedbackForm, FeedbackInput, FeedbackSendBtn } from "../../styles/feedbacks/write";
import { post, put } from "../../api";
import { errorModal, successModal } from "../modals/AlertModal";
import { useLocation } from "react-router-dom";

export default function FeedbackWrite({ feedbackData, isEdit, user, getFeedbackDatas, setIsEdit }) {
  const [feedback, setFeedback] = useState("");

  const location = useLocation();
  const pathname = location.pathname.slice(7);

  console.log(pathname);

  useEffect(() => {
    setFeedback(feedbackData?.content);
  }, [feedbackData]);

  const onChangeFeedback = (e) => {
    setFeedback(e.target.value);
  };

  const onSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      await post("comments", {
        portfolioId: pathname || user?.id,
        content: feedback,
      });

      setFeedback("");
      getFeedbackDatas();
      successModal("피드백이 작성되었습니다.");
    } catch (err) {
      errorModal(err.message);
    }
  };

  const onSubmitEditFeedback = async (e) => {
    e.preventDefault();
    try {
      await put(`comments/${feedbackData?._id}`, {
        content: feedback,
      });
      setIsEdit(false);
      getFeedbackDatas();
      successModal("피드백이 수정되었습니다.");
    } catch (err) {
      errorModal(err.message);
    }
  };

  return (
    <FeedbackForm>
      <FeedbackInput type="text" placeholder="피드백을 남겨주세요." value={feedback} onChange={onChangeFeedback} />
      <FeedbackSendBtn onClick={isEdit ? onSubmitEditFeedback : onSubmitFeedback}>
        {isEdit ? "수정" : "게시"}
      </FeedbackSendBtn>
    </FeedbackForm>
  );
}
