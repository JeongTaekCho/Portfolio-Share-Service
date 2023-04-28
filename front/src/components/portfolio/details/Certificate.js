import React from "react";
import { CertificateBox, CertificateText, DetailWrap } from "../../../styles/portfolio/details/Certificate";

export default function CertificateDetail({ certificate }) {
  return (
    <DetailWrap>
      <CertificateBox>
        <CertificateText>🔖 자격증명: 토익 자격증</CertificateText>
        <CertificateText>📅 발급날짜: 2023-04-26</CertificateText>
      </CertificateBox>
      <CertificateText>🏛️ 발급기관: 정부</CertificateText>
    </DetailWrap>
  );
}
