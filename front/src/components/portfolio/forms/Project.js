import React from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Project";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";

export default function ProjectForm({ setIsProject }) {
  const onClickCancelForm = () => {
    setIsProject(false);
  };

  return (
    <Form>
      <TextField label="프로젝트명" id="outlined-start-adornment" sx={{ m: 1, width: "25ch" }} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker label="프로젝트 시작" />
          <DatePicker label="프로젝트 마감" />
        </DemoContainer>
      </LocalizationProvider>
      <Textarea minRows={2} placeholder="프로젝트 내용" />
      <BtnBox>
        <Button>등록</Button>
        <Button className="cancelBtn" onClick={onClickCancelForm}>
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
