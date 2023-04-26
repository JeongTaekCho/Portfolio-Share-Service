import React from "react";
import { PortfolioBox, Title } from "../../styles/portfolio/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import ProjectForm from "./forms/Project";
import EducationForm from "./forms/Education";

export default function Box({ title }) {
  const [isProject, setIsProject] = useState(false);
  const [isEducation, setIsEducation] = useState(false);

  const onClickBtn = () => {
    if (title === "프로젝트") {
      setIsProject((prev) => !prev);
    }
    if (title === "학력") {
      setIsEducation((prev) => !prev);
    }
  };

  return (
    <PortfolioBox>
      <Title>{title}</Title>
      {isProject && <ProjectForm setIsProject={setIsProject} />}
      {isEducation && <EducationForm setIsEducation={setIsEducation} />}
      <Button variant="contained" color="success" onClick={onClickBtn}>
        {isProject || isEducation ? "-" : "+"}
      </Button>
    </PortfolioBox>
  );
}
