import React from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Education";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormControl from "@mui/joy/FormControl";

export default function EducationForm({ setIsEducation }) {
  const onClickCancelForm = () => {
    setIsEducation(false);
  };

  return (
    <Form>
      <TextField label="학교명" id="outlined-start-adornment" sx={{ m: 1, width: "25ch" }} />
      <TextField label="전공" id="outlined-start-adornment" sx={{ m: 1, width: "25ch" }} />
      <FormControl>
        <RadioGroup defaultValue="medium" name="radio-buttons-group">
          <Radio value="재학중" label="재학중" size="md" />
          <Radio value="고등학교 졸업" label="고등학교 졸업" size="md" />
          <Radio value="학사 졸업" label="학사 졸업" size="md" />
          <Radio value="석사 졸업" label="석사 졸업" size="md" />
          <Radio value="박사 졸업" label="박사 졸업" size="md" />
        </RadioGroup>
      </FormControl>

      <BtnBox>
        <Button>등록</Button>
        <Button className="cancelBtn" onClick={onClickCancelForm}>
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
