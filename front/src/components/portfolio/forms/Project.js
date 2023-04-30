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
import { errorModal, successModal } from "../../modals/AlertModal";

export default function ProjectForm({ setIsProject, getProjectData, project, onClickToggleShowBtn }) {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (project) {
      setProjectName(project?.projectName);
      setStartDate(dayjs(project?.startDate));
      setEndDate(dayjs(project?.endDate));
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

  const onClickAddProject = async () => {
    try {
      if (projectName && startDate && endDate && content) {
        const data = {
          projectName,
          startDate,
          endDate,
          content,
        };
        await post("projects", data);
        setIsProject(false);
        getProjectData();
        successModal("수상이력이 등록되었습니다.");
      } else {
        errorModal("빈칸을 채워주세요.");
      }
    } catch (err) {
      errorModal(err.message);
    }
  };

  const onClickEditProject = async () => {
    try {
      if (projectName && startDate && endDate && content) {
        const data = {
          projectName,
          startDate,
          endDate,
          content,
        };
        await put(`projects/${project._id}`, data);
        onClickToggleShowBtn();
        getProjectData();
        successModal("프로젝트가 수정되었습니다.");
      } else {
        errorModal("빈칸을 채워주세요.");
      }
    } catch (err) {
      errorModal(err.message);
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
