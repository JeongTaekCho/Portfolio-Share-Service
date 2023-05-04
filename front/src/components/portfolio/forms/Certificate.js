import React, { useEffect, useState } from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/certificate";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/joy/Button";
import { post, put } from "../../../api";
import dayjs from "dayjs";
import { errorModal, successModal } from "../../modals/AlertModal";

export default function CertificateForm({ setIsCertificate, getCertificateData, onClickToggleShowBtn, certificate }) {
  const [certificationName, setCertificationName] = useState("");
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (certificate) {
      setCertificationName(certificate?.certificationName);
      setDate(dayjs(certificate?.date));
      setDescription(certificate?.description);
    }
  }, [certificate]);

  const onChangeCertificationName = (e) => {
    setCertificationName(e.target.value);
  };

  const onChangeDate = ({ $d }) => {
    setDate($d);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onClickAddCertificate = async (e) => {
    e.preventDefault();
    try {
      if (certificationName && date && description) {
        const data = {
          certificationName,
          date,
          description,
        };

        await post("certifications", data);
        getCertificateData();
        setIsCertificate(false);
        successModal("자격증이 등록되었습니다.");
      } else {
        errorModal("빈칸을 채워주세요.");
      }
    } catch (err) {
      errorModal(err.message);
    }
  };

  const onClickEditCertificate = async () => {
    try {
      if (certificationName && date && description) {
        const data = {
          certificationName,
          date,
          description,
        };
        await put(`certifications/${certificate._id}`, data);
        onClickToggleShowBtn();
        getCertificateData();
        successModal("자격증 정보가 수정되었습니다.");
      } else {
        errorModal("빈칸을 채워주세요.");
      }
    } catch (err) {
      errorModal(err.message);
    }
  };

  const onClickCancelForm = () => {
    setIsCertificate(false);
  };

  return (
    <Form>
      <TextField
        label="자격증 이름"
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
        onChange={onChangeCertificationName}
        value={certificationName}
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
            marginBottom: "10px",
          }}
        >
          <DatePicker
            label="자격증 취득날짜"
            name="date"
            onChange={onChangeDate}
            value={date}
            InputLabelProps={{
              style: { fontSize: "1.6rem" },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <TextField
        style={{ marginBottom: "2rem" }}
        label="발급기관"
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
        value={description}
        onChange={onChangeDescription}
      />
      <BtnBox>
        <Button
          onClick={certificate ? onClickEditCertificate : onClickAddCertificate}
          style={{ fontSize: "1.6rem", padding: "1rem" }}
        >
          {certificate ? "수정" : "등록"}{" "}
        </Button>
        <Button
          className="cancelBtn"
          onClick={certificate ? onClickToggleShowBtn : onClickCancelForm}
          style={{ fontSize: "1.6rem", padding: "1rem" }}
        >
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
