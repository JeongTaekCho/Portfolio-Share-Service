import React, { useEffect, useState } from "react";
import { BtnBox, Form } from "../../../styles/portfolio/forms/Award";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/joy/Button";
import { post, put } from "../../../api";
import dayjs from "dayjs";
import { errorModal, successModal } from "../../modals/AlertModal";

export default function AwardForm({ setIsAward, getAwardData, onClickToggleShowBtn, award }) {
  const [awardName, setAwardName] = useState("");
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (award) {
      setAwardName(award?.awardName);
      setDate(dayjs(award?.date));
    }
  }, [award]);

  const onChangeAwardName = (e) => {
    setAwardName(e.target.value);
  };

  const onChangeDate = ({ $d }) => {
    setDate($d);
  };

  const onClickAddAward = async (e) => {
    e.preventDefault();
    try {
      if (awardName && date) {
        const data = {
          awardName,
          date,
        };

        await post("awards", data);
        getAwardData();
        setIsAward(false);
        successModal("수상이력이 등록되었습니다.");
      } else {
        errorModal("빈칸을 채워주세요.");
      }
    } catch (err) {
      errorModal(err.message);
    }
  };

  const onClickEditAward = async () => {
    try {
      if (awardName && date) {
        const data = {
          awardName,
          date,
        };
        await put(`awards/${award._id}`, data);
        onClickToggleShowBtn();
        getAwardData();
        successModal("수상이력이 수정되었습니다.");
      } else {
        errorModal("빈칸을 채워주세요.");
      }
    } catch (err) {
      errorModal(err.message);
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
        onChange={onChangeAwardName}
        value={awardName}
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
            label="수상 날짜"
            name="date"
            onChange={onChangeDate}
            value={date}
            InputLabelProps={{
              style: { fontSize: "1.6rem" },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <BtnBox>
        <Button onClick={award ? onClickEditAward : onClickAddAward} style={{ fontSize: "1.6rem", padding: "1rem" }}>
          {" "}
          {award ? "수정" : "등록"}{" "}
        </Button>
        <Button
          className="cancelBtn"
          onClick={award ? onClickToggleShowBtn : onClickCancelForm}
          style={{ fontSize: "1.6rem", padding: "1rem" }}
        >
          취소
        </Button>
      </BtnBox>
    </Form>
  );
}
