import React, { useState } from "react";
import {
  DetailWrap,
  ProjectBox,
  ProjectContent,
  ProjectContentBox,
  ProjectText,
  ProjectTextBox,
} from "../../../styles/portfolio/details/Project";
import ProjectForm from "../forms/Project";
import { Button } from "@mui/material";

export default function ProjectDetail({ project, getProjectData }) {
  const [isEditShow, setIsEditShow] = useState(false);

  const onClickToggleShowBtn = () => {
    setIsEditShow((prev) => !prev);
  };
  return (
    <>
      <DetailWrap>
        <ProjectBox>
          <ProjectTextBox>
            <ProjectText>📄 프로젝트명: {project.projectName}</ProjectText>
            <ProjectText>
              📆 프로젝트 기간: {project.startDate.slice(0, 10)} ~ {project.endDate.slice(0, 10)}
            </ProjectText>
          </ProjectTextBox>
          <ProjectContentBox>
            <ProjectContent>{project.content}</ProjectContent>
          </ProjectContentBox>
          <Button
            style={{ backgroundColor: "#999" }}
            variant="contained"
            color="success"
            onClick={onClickToggleShowBtn}
          >
            {isEditShow ? "취소" : "수정"}
          </Button>
        </ProjectBox>
      </DetailWrap>
      {isEditShow && (
        <ProjectForm project={project} onClickToggleShowBtn={onClickToggleShowBtn} getProjectData={getProjectData} />
      )}
    </>
  );
}
