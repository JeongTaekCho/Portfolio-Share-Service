import React, { useState } from "react";
import { AwardBox, AwardText, BtnBox, DetailWrap } from "../../../styles/portfolio/details/Award";
import { Button } from "@mui/material";
import AwardForm from "../forms/Award";
import * as Api from "../../../api";

export default function AwardDetail({ award, userId, getAwardData }) {
  const [isEditShow, setIsEditShow] = useState(false);

  const onClickDeleteAward = async () => {
    try {
      await Api.delete(`awards/${award._id}`);
      getAwardData();
      alert("수상이력이 삭제되었습니다.");
    } catch (err) {
      console.log(err.message);
    }
  };

  const onClickToggleShowBtn = () => {
    setIsEditShow((prev) => !prev);
  };
  return (
    <>
      <DetailWrap>
        <AwardBox>
          <AwardText>🏆 수상이름: {award?.awardName}</AwardText>
          <AwardText>📅 수상날짜: {award?.date.slice(0, 10)}</AwardText>
        </AwardBox>
        {award.userId === userId && (
          <BtnBox>
            <Button
              style={{ backgroundColor: "#999" }}
              variant="contained"
              color="success"
              onClick={onClickToggleShowBtn}
            >
              {isEditShow ? "취소" : "수정"}
            </Button>
            <Button
              style={{ backgroundColor: "#f00" }}
              variant="contained"
              color="success"
              onClick={onClickDeleteAward}
            >
              삭제
            </Button>
          </BtnBox>
        )}
      </DetailWrap>
      {isEditShow && (
        <AwardForm award={award} onClickToggleShowBtn={onClickToggleShowBtn} getAwardData={getAwardData} />
      )}
    </>
  );
}
