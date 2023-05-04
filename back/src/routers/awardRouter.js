import express from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";
import { validateEmptyBody } from "../utils/validators"

const awardRouter = express.Router();

// award 생성
awardRouter.post("/"
,login_required
,async function (req, res, next) {
  try {
    validateEmptyBody(req);
    const userId = req.currentUserId;
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

awardRouter.put("/:id"
,login_required
,async function (req, res, next) {
  try {
    validateEmptyBody(req);
    const awardId = req.params.id;
    const userId = req.currentUserId;
    const { awardName, date } = req.body;

    const award = await AwardService.changeAward({ awardId, awardName, date, userId});

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.json(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/:id"
, login_required
, async function (req, res, next) {
  try {
    const awardId = req.params.id;
    const userId = req.currentUserId;
    await AwardService.deleteAward(awardId, userId);

    res.json({ message: '프로젝트 삭제 완료' });
  } catch (error) {
    next(error);
  }
});

export {awardRouter};