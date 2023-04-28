import is from "@sindresorhus/is";
import express from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";

const awardRouter = express.Router();

// award 생성
awardRouter.post("/"
,login_required
,async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.currentUserId;
    console.log(userId);
    const { awardName, date} = req.body;

    const newAward = await AwardService.addAward({
      awardName
      ,date
      ,userId
      ,
    });

    res.json(newAward);
  } catch (error) {
    next(error);
  }
});

// award 조회
awardRouter.get("/:id"
,login_required
,async function (req, res, next) {
  try {
    const awardId = req.params.id;
    console.log(awardId);
    const award = await AwardService.getAward({ awardId });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }
    res.json(award);

  } catch (error) {
    next(error);
  }
});

awardRouter.get("/user/:id"
,login_required
,async function (req, res, next) {
  try {
    const userId = req.params.id;
    const awards = await AwardService.getAwards({ userId });
    res.json(awards);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/:awardId"
,login_required
,async function (req, res, next) {
  try {
    const { awardId } = req.params;
    // const userId = req.currentUserId;

    const {awardName, date} = req.body;

    const award = await AwardService.setAward({ awardId, awardName, date});

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.json(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/:id"
,login_required
, async function (req, res, next) {
  try {
    const awardId = req.params.id;
    console.log('awardRouter awaridId : ', awardId);

    const result = await AwardService.deleteAward(awardId);

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.json({ message: '프로젝트 삭제 완료' });
  } catch (error) {
    next(error);
  }
});


export {awardRouter};
