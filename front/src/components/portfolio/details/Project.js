import React, { useState } from "react";
import {
  BtnBox,
  DetailWrap,
  ProjectBox,
  ProjectContent,
  ProjectContentBox,
  ProjectText,
  ProjectTextBox,
} from "../../../styles/portfolio/details/Project";
import ProjectForm from "../forms/Project";
import { Button } from "@mui/material";
import * as Api from "../../../api";

export default function ProjectDetail({ project, getProjectData, userId }) {
  const [isEditShow, setIsEditShow] = useState(false);

  //겹치는 API리팩토링 예정
  const onClickDeleteProject = async () => {
    try {
      await Api.delete(`projects/${project._id}`);
      getProjectData();
      alert("프로젝트가 삭제되었습니다.");
    } catch (err) {
      console.log(err.message);
    }
  };

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
          {project.userId === userId && (
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
                onClick={onClickDeleteProject}
              >
                삭제
              </Button>
            </BtnBox>
          )}
        </ProjectBox>
      </DetailWrap>
      {isEditShow && (
        <ProjectForm project={project} onClickToggleShowBtn={onClickToggleShowBtn} getProjectData={getProjectData} />
      )}
    </>
  );
}
