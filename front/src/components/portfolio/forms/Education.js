import React, { useEffect } from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Education";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormControl from "@mui/joy/FormControl";
import { useState } from "react";
import { post, put } from "../../../api";
import { errorModal, successModal } from "../../modals/AlertModal";

export default function EducationForm({ setIsEducation, education, getEducationData, onClickToggleShowBtn }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (education) {
      setSchool(education?.school);
      setMajor(education?.major);
      setPosition(education?.position);
    }
  }, [education]);

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

  const onSubmitBtn = async (e) => {
    e.preventDefault();
    try {
      const data = {
        school,
        major,
        position,
      };
      if (school !== "" && major !== "" && position !== "") {
        await post("educations", data);
        getEducationData();
        successModal("학력정보가 등록되었습니다.");
        setIsEducation(false);
      } else {
        errorModal("빈칸을 입력해주세요.");
      }
    } catch (err) {
      errorModal(err.message);
    }
  };

  const onClickEditEducation = async (e) => {
    e.preventDefault();
    try {
      if (school && major && position) {
        const data = {
          school,
          major,
          position,
        };
        await put(`educations/${education._id}`, data);
        getEducationData();
        onClickToggleShowBtn();
        successModal("학력정보가 수정되었습니다.");
      } else {
        errorModal("빈칸을 입력해주세요.");
      }
    } catch (err) {
      errorModal(err.message);
    }
  };

  return (
    <Form onSubmit={education ? onClickEditEducation : onSubmitBtn}>
      <TextField
        label="학교명"
        name="school"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        onChange={onChangeValue}
        value={school}
      />
      <TextField
        label="전공"
        name="major"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        onChange={onChangeValue}
        value={major}
      />
      <FormControl>
        <RadioGroup defaultValue="medium" name="radio-buttons-group">
          <Radio
            value="재학중"
            name="position"
            label="재학중"
            size="md"
            onChange={onChangeValue}
            checked={position === "재학중"}
          />
          <Radio
            value="고등학교 졸업"
            name="position"
            label="고등학교 졸업"
            size="md"
            onChange={onChangeValue}
            checked={position === "고등학교 졸업"}
          />
          <Radio
            value="학사 졸업"
            name="position"
            label="학사 졸업"
            size="md"
            onChange={onChangeValue}
            checked={position === "학사 졸업"}
          />
          <Radio
            value="석사 졸업"
            name="position"
            label="석사 졸업"
            size="md"
            onChange={onChangeValue}
            checked={position === "석사 졸업"}
          />
          <Radio
            value="박사 졸업"
            name="position"
            label="박사 졸업"
            size="md"
            onChange={onChangeValue}
            checked={position === "박사 졸업"}
          />
        </RadioGroup>
      </FormControl>

      <BtnBox>
        <Button type="submit">{education ? "수정" : "등록"}</Button>
        <Button className="cancelBtn" onClick={education ? onClickToggleShowBtn : onClickCancelForm}>
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
