import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import { BotImg, BotImgBox, Container, PortfolioContainer, PortfolioList, Wrap } from "../styles/Portfolio";
import Box from "./portfolio/Box";
import Loading from "./Loading";
import Feedback from "./feedbacks/feedback";
import { Chat } from "./portfolio/Chat";

const LIST = [
  {
    id: "education",
    title: "학력",
  },
  {
    id: "award",
    title: "수상이력",
  },
  {
    id: "project",
    title: "프로젝트",
  },
  {
    id: "certificate",
    title: "자격증",
  },
];

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    const res = await Api.get("users", ownerId);
    const ownerData = res.data;
    setPortfolioOwner(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      const ownerId = params.userId;
      fetchPorfolioOwner(ownerId);
    } else {
      const ownerId = userState.user.id;
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return <Loading />;
  }

  const onClickBotBtn = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <Wrap>
      <Container>
        <User portfolioOwnerId={portfolioOwner.id} isEditable={portfolioOwner.id === userState.user?.id} />
        <PortfolioContainer>
          <PortfolioList>
            {LIST.map((el, index) => (
              <Box key={index} title={el.title} mvpId={el.id} />
            ))}
          </PortfolioList>
          <Feedback user={userState?.user} portfolioOwner={portfolioOwner} />
        </PortfolioContainer>
      </Container>
      {isShow && <Chat onClickBotBtn={onClickBotBtn} />}
      <BotImgBox onClick={onClickBotBtn}>
        <BotImg src="/images/bot.png" />
      </BotImgBox>
    </Wrap>
  );
}

export default Portfolio;
