import React from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/certificate";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/joy/Button";

export default function CertificateForm({ setIsCertificate }) {
  const onClickCancelForm = () => {
    setIsCertificate(false);
  };

  return (
    <Form>
      <TextField label="자격증 이름" id="outlined-start-adornment" sx={{ m: 1, width: "25ch" }} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker label="자격증 취득날짜" />
        </DemoContainer>
      </LocalizationProvider>
      <TextField
        style={{ marginBottom: "20px" }}
        label="발급기관"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
      />
      <BtnBox>
        <Button>등록</Button>
        <Button className="cancelBtn" onClick={onClickCancelForm}>
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
