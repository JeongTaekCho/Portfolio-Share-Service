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
    console.log('req.params.userId: ',req.params.userId);
    console.log('req.currentUserId: ',req.currentUserId);
    const educations = await EducationService.getEducations({userId});
    res.json(educations);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/:id", login_required, async (req, res, next) => {
  try {
    // URI로부터 education id를 추출함.
    const educationId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const school = req.body.school ?? null;
    const major = req.body.major ?? null;
    const position = req.body.position ?? null;
    const toUpdate = { school, major, position };

    const education = await EducationService.setEducation({educationId, toUpdate});
    
    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }
    
    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/:id", login_required, async (req, res, next) => {
  try {
    const educationId = req.params.id;
    if (educationId){
      await EducationService.deleteEducation(educationId);
      res.status(200).json({ message: "education 삭제 완료" });
    } 
    else res.status(400).json({ message: "educationId는 필수값입니다." });
  } catch (error) {
    next(error);
  }
});

export { educationRouter };