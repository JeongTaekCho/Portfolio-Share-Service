import React, { useState } from "react";
import { BtnBox, DetailWrap, EducationBox, EducationText } from "../../../styles/portfolio/details/Education";
import * as Api from "../../../api";
import { Button } from "@mui/material";
import EducationForm from "../forms/Education";
import { errorModal, successModal } from "../../modals/AlertModal";

export default function EducationDetail({ education, userId, getEducationData }) {
  const [isEditShow, setIsEditShow] = useState(false);

  const onClickDeleteEducation = async () => {
    try {
      await Api.delete(`educations/${education._id}`);
      getEducationData();
      successModal("학력정보가 삭제되었습니다.");
    } catch (err) {
      errorModal(err.message);
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
