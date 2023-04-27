import React from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Award";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/joy/Button";

export default function AwardForm({ setIsAward }) {
  const onClickCancelForm = () => {
    setIsAward(false);
  };

  return (
    <Form>
      <TextField label="수상 이름" id="outlined-start-adornment" sx={{ m: 1, width: "25ch" }} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker label="수상 날짜" />
        </DemoContainer>
      </LocalizationProvider>
      <BtnBox>
        <Button>등록</Button>
        <Button className="cancelBtn" onClick={onClickCancelForm}>
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
