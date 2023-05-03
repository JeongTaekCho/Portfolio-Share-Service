import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(-135deg, rgb(200, 80, 192), rgb(65, 88, 208));
  padding-top: 100px;
`;

export const Container = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

export const PortfolioContainer = styled.div`
  width: 800px;
`;

export const PortfolioList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
`;

export const BotImgBox = styled.div`
  width: 100px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  cursor: pointer;
`;

export const BotImg = styled.img`
  width: 100%;
`;
