import styled from "styled-components";
import { res } from "./responsive";

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(-135deg, rgb(200, 80, 192), rgb(65, 88, 208));
  padding-top: 10rem;
`;

export const Container = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  @media ${res.tablet} {
    width: 90%;
    flex-direction: column;
    gap: 3rem;
    .userCard {
      width: 55% !important;
      margin: 0 auto !important;
      @media ${res.mobile} {
        width: 80% !important;
      }
    }
  }
`;

export const PortfolioContainer = styled.div`
  width: 800px;
  @media ${res.tablet} {
    width: 100%;
  }
`;

export const PortfolioList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
`;

export const BotImgBox = styled.div`
  width: 10rem;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
`;

export const BotImg = styled.img`
  width: 100%;
`;
