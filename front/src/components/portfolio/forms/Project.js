import React, { useEffect, useState } from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Project";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { post, put } from "../../../api";
import dayjs from "dayjs";

export default function ProjectForm({ setIsProject, getProjectData, project, onClickToggleShowBtn }) {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (project) {
      setProjectName(project?.projectName);
      setStartDate(dayjs(project?.startDate, "ko-kr"));
      setEndDate(dayjs(project?.endDate, "ko-kr"));
      setContent(project?.content);
    }
  }, [project]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      setProjectName(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const onChangeStartDate = ({ $d }) => {
    setStartDate($d);
  };
  const onChangeEndDate = ({ $d }) => {
    setEndDate($d);
  };

  const onClickCancelForm = () => {
    setIsProject(false);
  };

  //겹치는 API리팩토링 예정
  const onClickAddProject = async () => {
    try {
      if (projectName && startDate && endDate && content) {
        const data = {
          projectName,
          startDate,
          endDate,
          content,
        };
        const result = await post("projects", data);
        setIsProject(false);
        getProjectData();
        alert("프로젝트가 등록되었습니다.");
      } else {
        alert("빈칸을 채워주세요.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //겹치는 API리팩토링 예정
  const onClickEditProject = async () => {
    try {
      if (projectName && startDate && endDate && content) {
        const data = {
          projectName,
          startDate,
          endDate,
          content,
        };
        const result = await put(`projects/${project._id}`, data);
        onClickToggleShowBtn();
        getProjectData();
        alert("프로젝트가 수정되었습니다.");
      } else {
        alert("빈칸을 채워주세요.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form>
      <TextField
        label="프로젝트명"
        name="projectName"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        onChange={onChangeInput}
        value={projectName}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker label="프로젝트 시작" onChange={onChangeStartDate} value={startDate} />
          <DatePicker label="프로젝트 마감" onChange={onChangeEndDate} value={endDate} />
        </DemoContainer>
      </LocalizationProvider>
      <Textarea minRows={2} name="content" placeholder="프로젝트 내용" onChange={onChangeInput} value={content} />
      <BtnBox>
        <Button onClick={project ? onClickEditProject : onClickAddProject}>{project ? "수정" : "등록"}</Button>
        <Button className="cancelBtn" onClick={project ? onClickToggleShowBtn : onClickCancelForm}>
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
