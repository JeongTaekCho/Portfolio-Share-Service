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
import styled from "styled-components";

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
        successModal("프로젝트가 등록되었습니다.");
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
        sx={{
          m: 1,
          width: "100%",
          " .MuiOutlinedInput-root": {
            fontSize: "1.6rem",
          },
          margin: 0,
        }}
        InputLabelProps={{
          style: { fontSize: "1.6rem" },
        }}
        onChange={onChangeInput}
        value={projectName}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DatePicker", "DatePicker"]}
          sx={{
            m: 1,
            width: "100%",
            " .MuiOutlinedInput-root": {
              fontSize: "1.6rem",
            },
            margin: 0,
          }}
        >
          <DatePicker
            label="프로젝트 시작"
            onChange={onChangeStartDate}
            value={startDate}
            InputLabelProps={{
              style: { fontSize: "1.6rem" },
            }}
          />
        </DemoContainer>
        <DemoContainer
          components={["DatePicker", "DatePicker"]}
          sx={{
            m: 1,
            width: "100%",
            " .MuiOutlinedInput-root": {
              fontSize: "1.6rem",
            },
            margin: 0,
          }}
        >
          <DatePicker
            label="프로젝트 마감"
            onChange={onChangeEndDate}
            value={endDate}
            InputLabelProps={{
              style: { fontSize: "1.6rem" },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Textarea
        minRows={2}
        name="content"
        placeholder="프로젝트 내용"
        onChange={onChangeInput}
        value={content}
        style={{ width: "100%", minHeight: "150px", marginTop: "10px", fontSize: "1.6rem" }}
      />
      <BtnBox>
        <Button
          onClick={project ? onClickEditProject : onClickAddProject}
          style={{ fontSize: "1.6rem", padding: "1rem" }}
        >
          {project ? "수정" : "등록"}
        </Button>
        <Button
          className="cancelBtn"
          onClick={project ? onClickToggleShowBtn : onClickCancelForm}
          style={{ fontSize: "1.6rem", padding: "1rem" }}
        >
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
