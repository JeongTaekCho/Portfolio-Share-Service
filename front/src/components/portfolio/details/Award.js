import React from "react";
import { AwardBox, AwardText, DetailWrap } from "../../../styles/portfolio/details/Award";

export default function AwardDetail({ award }) {
  return (
    <DetailWrap>
      <AwardBox>
        <AwardText>🏆 수상이름: {award?.awardName}</AwardText>
        <AwardText>📅 수상날짜: {award?.date.slice(0, 10)}</AwardText>
      </AwardBox>
    </DetailWrap>
  );
}
