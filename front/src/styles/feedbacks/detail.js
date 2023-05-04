import styled from "styled-components";

export const DetailContainer = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 3rem;
  margin-bottom: 1rem;
`;

export const Nickname = styled.h3`
  font-size: 1.7rem;
  font-weight: 600;
  color: #111;
`;

export const Content = styled.pre`
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
  white-space: pre-wrap;
`;

export const DetailFoot = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
`;

export const CreatedAt = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  color: #555;
  margin-bottom: 0;
`;

export const EditAndDeleteBox = styled.div`
  display: flex;
`;

export const DetailBtn = styled.button`
  font-size: 1.3rem;
  font-weight: 400;
  color: #555;
  border: none;
  background: none;
`;
