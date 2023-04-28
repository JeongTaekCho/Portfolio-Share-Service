import React, { useState } from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Award";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/joy/Button";
import { post } from "../../../api";

export default function AwardForm({ setIsAward, getAwardData }) {
  const [awardName, setAwardName] = useState("");
  const [date, setDate] = useState("");

  const onChangeAwardName = (e) => {
    setAwardName(e.target.value);
  };

  const onChangeDate = ({ $d }) => {
    setDate($d);
  };

  console.log(awardName, date);

  const onClickAddAward = async (e) => {
    e.preventDefault();
    try {
      if (awardName && date) {
        const data = {
          awardName,
          date,
        };

        const result = await post("awards", data);
        getAwardData();
        setIsAward(false);
        alert("수상이력이 등록되었습니다.");
      } else {
        alert("빈칸을 채워주세요.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickCancelForm = () => {
    setIsAward(false);
  };

  return (
    <Form>
      <TextField
        label="수상 이름"
        name="awardName"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        onChange={onChangeAwardName}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker label="수상 날짜" name="date" onChange={onChangeDate} />
        </DemoContainer>
      </LocalizationProvider>
      <BtnBox>
        <Button onClick={onClickAddAward}>등록</Button>
        <Button className="cancelBtn" onClick={onClickCancelForm}>
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
