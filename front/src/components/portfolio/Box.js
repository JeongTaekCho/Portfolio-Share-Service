import React from "react";
import { PortfolioBox, Title } from "../../styles/portfolio/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import ProjectForm from "./forms/Project";

export default function Box({ title }) {
  const [isProject, setIsProject] = useState(false);

  const onClickBtn = () => {
    if (title === "프로젝트") {
      setIsProject((prev) => !prev);
    }
  };

  return (
    <PortfolioBox>
      <Title>{title}</Title>
      {isProject && <ProjectForm setIsProject={setIsProject} />}
      <Button variant="contained" color="success" onClick={onClickBtn}>
        {isProject ? "-" : "+"}
      </Button>
    </PortfolioBox>
  );
}
