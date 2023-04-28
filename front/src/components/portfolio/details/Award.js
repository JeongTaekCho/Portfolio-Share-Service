import React from "react";
import { AwardBox, AwardText, DetailWrap } from "../../../styles/portfolio/details/Award";

export default function AwardDetail({ award }) {
  return (
    <DetailWrap>
      <AwardBox>
        <AwardText>🏆 수상이름: 국제 우주선 만들기 대상</AwardText>
        <AwardText>📅 수상날짜: 2023-04-05</AwardText>
      </AwardBox>
    </DetailWrap>
  );
}
