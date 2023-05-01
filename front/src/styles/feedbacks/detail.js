import styled from "styled-components";

export const DetailContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 30px;
  margin-bottom: 10px;
`;

export const Nickname = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #111;
`;

export const Content = styled.pre`
  font-size: 15px;
  font-weight: 500;
  color: #000;
  white-space: pre-wrap;
`;

export const DetailFoot = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

export const CreatedAt = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #555;
  margin-bottom: 0;
`;

export const EditAndDeleteBox = styled.div`
  display: flex;
`;

export const DetailBtn = styled.button`
  font-size: 13px;
  font-weight: 400;
  color: #555;
  border: none;
  background: none;
`;
