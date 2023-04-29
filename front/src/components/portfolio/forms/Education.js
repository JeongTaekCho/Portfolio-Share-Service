import React from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Education";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormControl from "@mui/joy/FormControl";
import { useState } from "react";
import { post } from "../../../api";

export default function EducationForm({ setIsEducation, educationDatas, getEducationData }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  const onClickCancelForm = () => {
    setIsEducation(false);
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;

    if (name === "school") {
      setSchool(value);
    } else if (name === "major") {
      setMajor(value);
    } else if (name === "position") {
      setPosition(value);
    }
  };

  // 중복되는 API 수정예정
  const onSubmitBtn = async (e) => {
    e.preventDefault();
    try {
      const data = {
        school,
        major,
        position,
      };
      if (school !== "" && major !== "" && position !== "") {
        const result = await post("educations", data);
        getEducationData();
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
          <Radio value="재학중" name="position" label="재학중" size="md" onChange={onChangeValue} />
          <Radio value="고등학교 졸업" name="position" label="고등학교 졸업" size="md" onChange={onChangeValue} />
          <Radio value="학사 졸업" name="position" label="학사 졸업" size="md" onChange={onChangeValue} />
          <Radio value="석사 졸업" name="position" label="석사 졸업" size="md" onChange={onChangeValue} />
          <Radio value="박사 졸업" name="position" label="박사 졸업" size="md" onChange={onChangeValue} />
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
