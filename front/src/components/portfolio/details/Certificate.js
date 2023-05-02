import React, { useState } from "react";
import { CertificateBox, CertificateText, DetailWrap } from "../../../styles/portfolio/details/Certificate";
import { Button } from "@mui/material";
import CertificateForm from "../forms/Certificate";
import * as Api from "../../../api";
import { errorModal, successModal } from "../../modals/AlertModal";
import { BtnBox } from "../../../styles/portfolio/details/Award";

export default function CertificateDetail({ certificate, userId, getCertificateData }) {
  const [isEditShow, setIsEditShow] = useState(false);

  const onClickDeleteCertificate = async () => {
    try {
      await Api.delete(`certifications/${certificate._id}`);
      getCertificateData();
      successModal("자격증 정보가 삭제되었습니다.")
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
      <CertificateBox>
        <CertificateText>🔖 자격증명: {certificate?.certificationName}</CertificateText>
        <CertificateText>📅 발급날짜: {certificate?.date.slice(0, 10)}</CertificateText>
        <CertificateText>🏛️ 발급기관: {certificate?.description}</CertificateText>
      </CertificateBox>
      {certificate.userId === userId && (
        <BtnBox>
          <Button
            style={{backgroundColor: "#999"}}
            variant="contained"
            color="success"
            onClick={onClickToggleShowBtn}
          >
            {isEditShow ? "취소":"수정"}
          </Button>
          <Button
            style={{backgroundColor: "#f00"}}
            variant="contained"
            color="success"
            onClick={onClickDeleteCertificate}
          >
            삭제
          </Button>
        </BtnBox>
      )}
    </DetailWrap>
    {isEditShow && (
      <CertificateForm certificate={certificate} onClickToggleShowBtn={onClickToggleShowBtn} getCertificateData={getCertificateData} />
    )}
  </>
  );
}
