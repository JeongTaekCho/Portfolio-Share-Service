import React from "react";
import { DetailWrap, EducationBox, EducationText } from "../../../styles/portfolio/details/Education";

export default function EducationDetail({ education }) {
  return (
    <DetailWrap>
      <EducationBox>
        <EducationText>🖍️ 학교: {education.school}</EducationText>
        <EducationText>
          📖 전공: {education.major} / {education.position}
        </EducationText>
      </EducationBox>
    </DetailWrap>
  );
}
