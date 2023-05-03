import React from "react";
import { BoxText, PortfolioBox, Title } from "../../styles/portfolio/Box";
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
import { useLocation, useParams } from "react-router-dom";
import { getData } from "../../hooks/getData";

const TITLE = {
  education: "학력",
  project: "프로젝트",
  award: "수상이력",
  certificate: "자격증",
};

export default function Box({ title, mvpId }) {
  const [isProject, setIsProject] = useState(false);
  const [isEducation, setIsEducation] = useState(false);
  const [isAward, setIsAward] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);
  const [educationDatas, setEducationDatas] = useState([]);
  const [projectDatas, setProjectDatas] = useState([]);
  const [awardDatas, setAwardDatas] = useState([]);
  const [certificateDatas, setCertificateDatas] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const location = useLocation();
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    const getUserInfo = async () => {
      setUserInfo(await getData("user/current"));
    };
    getUserInfo();
  }, []);

  console.log(educationDatas);

  const getProjectData = async () => {
    setProjectDatas(await getData(`projects/user/${userId || userInfo?.id}`));
  };

  const getEducationData = async () => {
    setEducationDatas(await getData(`educations/user/${userId || userInfo?.id}`));
  };

  const getAwardData = async () => {
    setAwardDatas(await getData(`awards/user/${userId || userInfo?.id}`));
  };

  const getCertificateData = async () => {
    setCertificateDatas(await getData(`certifications/user/${userId || userInfo?.id}`));
  };

  useEffect(() => {
    if (userId || (!userId && userInfo?.id)) {
      getProjectData();
      getEducationData();
      getAwardData();
      getCertificateData();
    }
  }, [userInfo, userId]);

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
      {mvpId === "education" && educationDatas.length === 0 && <BoxText>학력정보가 없습니다. 추가해보세요!</BoxText>}
      {mvpId === "education" &&
        educationDatas?.map((education) => (
          <EducationDetail
            key={education._id}
            education={education}
            userId={userInfo?.id}
            getEducationData={getEducationData}
          />
        ))}
      {isEducation && (
        <EducationForm
          setIsEducation={setIsEducation}
          educationDatas={educationDatas}
          getEducationData={getEducationData}
        />
      )}
      {mvpId === "award" && awardDatas.length === 0 && <BoxText>수상이력 정보가 없습니다. 추가해보세요!</BoxText>}
      {mvpId === "award" &&
        awardDatas?.map((award) => (
          <AwardDetail key={award._id} award={award} getAwardData={getAwardData} userId={userInfo?.id} />
        ))}
      {isAward && <AwardForm setIsAward={setIsAward} getAwardData={getAwardData} />}

      {mvpId === "project" && projectDatas.length === 0 && <BoxText>프로젝트 정보가 없습니다. 추가해보세요!</BoxText>}
      {mvpId === "project" &&
        projectDatas?.map((project) => (
          <Project key={project._id} project={project} getProjectData={getProjectData} userId={userInfo?.id} />
        ))}
      {isProject && <ProjectForm setIsProject={setIsProject} getProjectData={getProjectData} />}

      {mvpId === "certificate" && certificateDatas.length === 0 && (
        <BoxText>자격증 정보가 없습니다. 추가해보세요!</BoxText>
      )}
      {mvpId === "certificate" &&
        certificateDatas?.map((certificate) => (
          <CertificateDetail
            key={certificate._id}
            certificate={certificate}
            getCertificateData={getCertificateData}
            userId={userInfo?.id}
          />
        ))}
      {isCertificate && <CertificateForm setIsCertificate={setIsCertificate} getCertificateData={getCertificateData} />}

      {location.pathname === "/" && (
        <Button variant="contained" color="success" onClick={onClickBtn} style={{ fontSize: "1.8rem" }}>
          {isProject || isEducation || isAward || isCertificate ? "-" : "+"}
        </Button>
      )}
    </PortfolioBox>
  );
}
