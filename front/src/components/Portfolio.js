import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Container, Col, Row } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import { Container, PortfolioList, Wrap } from "../styles/Portfolio";
import Box from "./portfolio/Box";

const LIST = [
  {
    title: "학력",
  },
  {
    title: "수상이력",
  },
  {
    title: "프로젝트",
  },
  {
    title: "자격증",
  },
];

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
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
    return "loading...";
  }

  return (
    <Wrap>
      <Container>
        <User portfolioOwnerId={portfolioOwner.id} isEditable={portfolioOwner.id === userState.user?.id} />
        <PortfolioList>
          {LIST.map((el, index) => (
            <Box key={index} title={el.title} />
          ))}
        </PortfolioList>
      </Container>
    </Wrap>
  );
}

export default Portfolio;
