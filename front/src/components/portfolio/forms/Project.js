import React, { useState } from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Project";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { post } from "../../../api";

export default function ProjectForm({ setIsProject, getProjectData }) {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");

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

  return (
    <Form>
      <TextField
        label="프로젝트명"
        name="projectName"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        onChange={onChangeInput}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker label="프로젝트 시작" onChange={onChangeStartDate} />
          <DatePicker label="프로젝트 마감" onChange={onChangeEndDate} />
        </DemoContainer>
      </LocalizationProvider>
      <Textarea minRows={2} name="content" placeholder="프로젝트 내용" onChange={onChangeInput} />
      <BtnBox>
        <Button onClick={onClickAddProject}>등록</Button>
        <Button className="cancelBtn" onClick={onClickCancelForm}>
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
