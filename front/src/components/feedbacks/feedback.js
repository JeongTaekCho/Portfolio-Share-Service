import React, { useEffect, useState } from "react";
import { FeedBackContainer, FeedbackMent, FeedbackTitle } from "../../styles/feedbacks/feedback";
import FeedbackDetail from "./detail";
import FeedbackWrite from "./write";
import { getData } from "../../hooks/getData";
import { useLocation } from "react-router-dom";

export default function Feedback({ user, portfolioOwner }) {
  const [feedbackDatas, setFeedbackDatas] = useState([]);

  const location = useLocation();
  const pathname = location.pathname.slice(7);
  useEffect(() => {
    getFeedbackDatas();
  }, [pathname]);

  const getFeedbackDatas = async () => {
    setFeedbackDatas(await getData(`comments/user/${pathname || user?.id}`));
  };

  return (
    <FeedBackContainer>
      <FeedbackTitle>포트폴리오 피드백</FeedbackTitle>
      {feedbackDatas?.length > 0 ? (
        feedbackDatas?.map((feedback) => (
          <FeedbackDetail feedback={feedback} getFeedbackDatas={getFeedbackDatas} user={user} key={feedback._id} />
        ))
      ) : (
        <FeedbackMent>
          피드백이 없습니다😂
          <br />
          {portfolioOwner.name}님을 위한 피드백을 작성해주세요!!
        </FeedbackMent>
      )}

      <FeedbackWrite user={user} getFeedbackDatas={getFeedbackDatas} />
    </FeedBackContainer>
  );
}
