import React from "react";
import { PortfolioBox, Title } from "../../styles/portfolio/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import ProjectForm from "./forms/Project";
import EducationForm from "./forms/Education";
import AwardForm from "./forms/Award";
import CertificateForm from "./forms/Certificate";
import EducationDetail from "./details/Education";
import Project from "./details/Project";
import { useEffect } from "react";
import { get } from "../../api";
import AwardDetail from "./details/Award";
import CertificateDetail from "./details/Certificate";

export default function Box({ title }) {
  const [isProject, setIsProject] = useState(false);
  const [isEducation, setIsEducation] = useState(false);
  const [isAward, setIsAward] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);
  const [educationDatas, setEducationDatas] = useState([]);
  const [projectDatas, setProjectDatas] = useState([]);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await get("user/current");
      setUserInfo(result.data);
    };
    getUserInfo();
  }, []);

  const getProjectData = async () => {
    const result = await get(`projects/user/${userInfo?.id}`);
    setProjectDatas(result.data);
  };
  const getEducationData = async () => {
    const result = await get(`educations/user/${userInfo?.id}`);
    setEducationDatas(result.data);
  };

  useEffect(() => {
    getProjectData();
    getEducationData();
  }, [userInfo]);

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
      {title === "수상이력" && <AwardDetail />}
      {isAward && <AwardForm setIsAward={setIsAward} />}
      {title === "프로젝트" &&
        projectDatas?.map((project) => <Project project={project} getProjectData={getProjectData} />)}
      {isProject && <ProjectForm setIsProject={setIsProject} getProjectData={getProjectData} />}
      {title === "자격증" && <CertificateDetail />}
      {isCertificate && <CertificateForm setIsCertificate={setIsCertificate} />}
      <Button variant="contained" color="success" onClick={onClickBtn}>
        {isProject || isEducation || isAward || isCertificate ? "-" : "+"}
      </Button>
    </PortfolioBox>
  );
}
