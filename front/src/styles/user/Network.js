import styled from "styled-components";
import { res } from "../responsive";

export const Wrap = styled.div`
  width: 100%;
  background: linear-gradient(-135deg, rgb(200, 80, 192), rgb(65, 88, 208));
  padding-top: 10rem;
`;

export const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  @media ${res.tablet} {
    width: 90%;
  }
  transform: translate();
`;

export const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .userCard {
    @media ${res.tablet} {
      width: 48% !important;
    }
    @media ${res.mobile} {
      width: 100% !important;
    }
  }
`;
