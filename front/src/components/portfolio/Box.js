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
import AwardDetail from "./details/Award";
import CertificateDetail from "./details/Certificate";
import { useLocation } from "react-router-dom";
import { getData } from "../../hooks/getData";

const TITLE = {
  education: "학력",
  project: "프로젝트",
  award: "수상이력",
  certificate: "자격증",
};

export default function Box({ title, mvp }) {
  const [isProject, setIsProject] = useState(false);
  const [isEducation, setIsEducation] = useState(false);
  const [isAward, setIsAward] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);
  const [educationDatas, setEducationDatas] = useState([]);
  const [projectDatas, setProjectDatas] = useState([]);
  const [awardDatas, setAwardDatas] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const location = useLocation();
  const pathname = location.pathname.slice(7);

  useEffect(() => {
    const getUserInfo = async () => {
      setUserInfo(await getData("user/current"));
    };
    getUserInfo();
  }, []);

  // 중복되는 API 수정 예정

  const getProjectData = async () => {
    setProjectDatas(await getData(`projects/user/${pathname || userInfo?.id}`));
  };

  const getEducationData = async () => {
    setEducationDatas(await getData(`educations/user/${pathname || userInfo?.id}`));
  };

  const getAwardData = async () => {
    setAwardDatas(await getData(`awards/user/${pathname || userInfo?.id}`));
  };

  useEffect(() => {
    getProjectData();
    getEducationData();
    getAwardData();
  }, [userInfo, location.pathname]);

  const onClickBtn = () => {
    if (title === TITLE.project) {
      setIsProject((prev) => !prev);
    }
    if (title === TITLE.education) {
      setIsEducation((prev) => !prev);
    }
    if (title === TITLE.award) {
      setIsAward((prev) => !prev);
    }
    if (title === TITLE.certificate) {
      setIsCertificate((prev) => !prev);
    }
  };
  return (
    <PortfolioBox>
      <Title>{title}</Title>
      {title === TITLE.education &&
        educationDatas?.map((education) => (
          <EducationDetail education={education} userId={userInfo?.id} getEducationData={getEducationData} />
        ))}
      {isEducation && (
        <EducationForm
          setIsEducation={setIsEducation}
          educationDatas={educationDatas}
          getEducationData={getEducationData}
        />
      )}

      {title === TITLE.award &&
        awardDatas?.map((award) => <AwardDetail award={award} getAwardData={getAwardData} userId={userInfo?.id} />)}
      {isAward && <AwardForm setIsAward={setIsAward} getAwardData={getAwardData} />}
      {title === TITLE.project &&
        projectDatas?.map((project) => (
          <Project project={project} getProjectData={getProjectData} userId={userInfo?.id} />
        ))}
      {isProject && <ProjectForm setIsProject={setIsProject} getProjectData={getProjectData} />}
      {title === TITLE.certificate && <CertificateDetail />}
      {isCertificate && <CertificateForm setIsCertificate={setIsCertificate} />}
      {location.pathname === "/" && (
        <Button variant="contained" color="success" onClick={onClickBtn}>
          {isProject || isEducation || isAward || isCertificate ? "-" : "+"}
        </Button>
      )}
    </PortfolioBox>
  );
}
