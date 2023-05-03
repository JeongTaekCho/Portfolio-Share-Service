import styled from "styled-components";
import { res } from "../../responsive";

export const DetailWrap = styled.div`
  width: 100%;
  padding: 3rem;
  background-color: #fff;
  border-radius: 0.8rem;
  margin-bottom: 2rem;
`;

export const CertificateBox = styled.div`
  display: flex;
  gap: 4rem;
  margin-bottom: 1.5rem;
  @media ${res.tablet} {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const CertificateText = styled.span`
  font-size: 2rem;
  font-weight: 400;
  color: #111;
`;
