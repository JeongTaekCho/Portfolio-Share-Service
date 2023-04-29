import React, { useState } from "react";
import { BtnBox, DetailWrap, EducationBox, EducationText } from "../../../styles/portfolio/details/Education";
import * as Api from "../../../api";
import { Button } from "@mui/material";
import EducationForm from "../forms/Education";

export default function EducationDetail({ education, userId, getEducationData }) {
  const [isEditShow, setIsEditShow] = useState(false);

  //겹치는 API리팩토링 예정
  const onClickDeleteEducation = async () => {
    try {
      await Api.delete(`educations/${education._id}`);
      getEducationData();
      alert("학력정보가 삭제되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const onClickToggleShowBtn = () => {
    setIsEditShow((prev) => !prev);
  };
  return (
    <>
      <DetailWrap>
        <EducationBox>
          <EducationText>🖍️ 학교: {education.school}</EducationText>
          <EducationText>
            📖 전공: {education.major} / {education.position}
          </EducationText>
        </EducationBox>
        {education.userId === userId && (
          <BtnBox>
            <Button
              style={{ backgroundColor: "#999" }}
              variant="contained"
              color="success"
              onClick={onClickToggleShowBtn}
            >
              {isEditShow ? "취소" : "수정"}
            </Button>
            <Button
              style={{ backgroundColor: "#f00" }}
              variant="contained"
              color="success"
              onClick={onClickDeleteEducation}
            >
              삭제
            </Button>
          </BtnBox>
        )}
      </DetailWrap>
      {isEditShow && (
        <EducationForm
          education={education}
          onClickToggleShowBtn={onClickToggleShowBtn}
          getEducationData={getEducationData}
        />
      )}
    </>
  );
}
