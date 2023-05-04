import styled from "styled-components";
import { res } from "../../responsive";

export const DetailWrap = styled.div`
  width: 100%;
  padding: 3rem;
  background-color: #fff;
  border-radius: 0.8rem;
  margin-bottom: 2rem;
`;

export const EducationBox = styled.div`
  display: flex;
  gap: 4rem;
  @media ${res.tablet} {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const EducationText = styled.span`
  font-size: 2rem;
  font-weight: 400;
  color: #111;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  .css-ke5b6m-MuiButtonBase-root-MuiButton-root {
    margin: 0;
  }
`;
