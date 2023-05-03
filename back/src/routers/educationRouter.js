import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";
import { validateEmptyBody } from "../utils/validators"

const educationRouter = Router();

// education 생성
educationRouter.post("/", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const userId = req.currentUserId;
    const { school, major, position } = req.body;

    const education = await EducationService.addEducation({userId, school, major, position});
    
    res.status(201).json(education)
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/:id", login_required, async function (req, res, next) {
  try {
    const educationId = req.params.id;

    const educationList = await EducationService.getEducation({educationId});
    
    if (educationList.errorMessage) 
      throw new Error(educationList.errorMessage);

    res.json(educationList);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/user/:userId", login_required, async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const educations = await EducationService.getEducations({userId});

    res.json(educations);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/:id", login_required, async function (req, res, next) {
  try {
    const educationId = req.params.id;
    const currentUserId = req.currentUserId;
    const { school, major, position } = req.body;  

    const education = await EducationService.changeEducation({ 
      educationId, currentUserId, school, major, position 
    });
    
    res.json(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/:id", login_required, async function (req, res, next){
  try {
    const educationId = req.params.id;
    const currentUserId = req.currentUserId;

    const education = await EducationService.deleteEducation(educationId, currentUserId);
     
    res.status(200).json({ message: "education 삭제 완료"});

  } catch (error) {
    next(error);
  }
});

export { educationRouter };