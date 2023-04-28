import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";

const educationRouter = Router();

// education 생성
educationRouter.post("/" ,login_required ,async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const userId = req.currentUserId;
    console.log(userId);
    const { school, major, position } = req.body;
    const education = await EducationService.addEducation({userId, school, major, position});
    res.status(201).json(education)

  } catch (error) {
    next(error);
  }
});

educationRouter.get("/:id", login_required, async (req, res, next) => {
  try {
    const educationId = req.params.id;
    const educationList = await EducationService.getEducation({educationId});
    res.json(educationList);

  } catch (error) {
    next(error);
  }
});

educationRouter.get("/user/:userId", login_required, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const educations = await EducationService.getEducations({userId});
    res.json(educations);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/:id", login_required, async (req, res, next) => {
  try {
    const educationId = req.params.id;
    const { school, major, position } = req.body;
    const education = await EducationService.setEducation({educationId, school, major, position});
    res.json(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/:id", login_required, async (req, res, next) => {
  try {
    const educationId = req.params.id;
    if (educationId){
      res.status(201).json({ message: "education 삭제 완료" });
      await EducationService.deleteEducation(educationId);
    } 
    else res.status(401).json({ message: "삭제할 수 없습니다." });
  } catch (error) {
    next(error);
  }
});

export { educationRouter };