import React from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Education";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormControl from "@mui/joy/FormControl";
import { useState } from "react";

export default function EducationForm({ setIsEducation, educationDatas, setEducationDatas }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("");

  const onClickCancelForm = () => {
    setIsEducation(false);
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;

    if (name === "school") {
      setSchool(value);
    } else if (name === "major") {
      setMajor(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };

  const onSubmitBtn = (e) => {
    e.preventDefault();
    try {
      const data = {
        school,
        major,
        status,
      };
      if (school !== "" && major !== "" && status !== "") {
        setEducationDatas([...educationDatas, data]);
        setIsEducation(false);
      } else {
        alert("빈칸을 입력해주세요.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={onSubmitBtn}>
      <TextField
        label="학교명"
        name="school"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        onChange={onChangeValue}
      />
      <TextField
        label="전공"
        name="major"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        onChange={onChangeValue}
      />
      <FormControl>
        <RadioGroup defaultValue="medium" name="radio-buttons-group">
          <Radio value="재학중" name="status" label="재학중" size="md" onChange={onChangeValue} />
          <Radio value="고등학교 졸업" name="status" label="고등학교 졸업" size="md" onChange={onChangeValue} />
          <Radio value="학사 졸업" name="status" label="학사 졸업" size="md" onChange={onChangeValue} />
          <Radio value="석사 졸업" name="status" label="석사 졸업" size="md" onChange={onChangeValue} />
          <Radio value="박사 졸업" name="status" label="박사 졸업" size="md" onChange={onChangeValue} />
        </RadioGroup>
      </FormControl>

      <BtnBox>
        <Button type="submit">등록</Button>
        <Button className="cancelBtn" onClick={onClickCancelForm}>
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
