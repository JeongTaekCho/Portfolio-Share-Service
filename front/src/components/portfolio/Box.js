import React from "react";
import { PortfolioBox, Title } from "../../styles/portfolio/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import ProjectForm from "./forms/Project";
import EducationForm from "./forms/Education";
import AwardForm from "./forms/Award";
import CertificateForm from "./forms/Certificate";
import EducationDetail from "./details/Education";
import { useEffect } from "react";
import axios from "axios";

export default function Box({ title }) {
  const [isProject, setIsProject] = useState(false);
  const [isEducation, setIsEducation] = useState(false);
  const [isAward, setIsAward] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);
  const [educationDatas, setEducationDatas] = useState([]);

  useEffect(() => {
    axios.get("/data/education.json").then((res) => {
      setEducationDatas(res.data);
    });
  }, []);

  const onClickBtn = () => {
    if (title === "프로젝트") {
      setIsProject((prev) => !prev);
    }
    if (title === "학력") {
      setIsEducation((prev) => !prev);
    }
    if (title === "수상이력") {
      setIsAward((prev) => !prev);
    }
    if (title === "자격증") {
      setIsCertificate((prev) => !prev);
    }
  };

  return (
    <PortfolioBox>
      <Title>{title}</Title>
      {title === "학력" && educationDatas.map((education) => <EducationDetail education={education} />)}
      {isEducation && (
        <EducationForm
          setIsEducation={setIsEducation}
          educationDatas={educationDatas}
          setEducationDatas={setEducationDatas}
        />
      )}
      {isAward && <AwardForm setIsAward={setIsAward} />}
      {isProject && <ProjectForm setIsProject={setIsProject} />}
      {isCertificate && <CertificateForm setIsCertificate={setIsCertificate} />}
      <Button variant="contained" color="success" onClick={onClickBtn}>
        {isProject || isEducation || isAward || isCertificate ? "-" : "+"}
      </Button>
    </PortfolioBox>
  );
}
