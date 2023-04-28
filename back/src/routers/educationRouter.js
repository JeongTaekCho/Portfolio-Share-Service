import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post("/", login_required, async (req, res, next) => {
  try {

    const userId = req.currentUserId;
    const { school, major, position } = req.body;
    const education = await EducationService.createEducation(userId, school, major, position);
    res.status(201).json(education)

  } catch (error) {
    next(error, console.log("add router error"));
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

educationRouter.get("/:id", login_required, async (req, res, next) => {
  try {
    const educationId = req.params.id;
    const educationList = await EducationService.getEducationById(educationId);
    res.json(educationList);

  } catch (error) {
    next(error);
  }
});

educationRouter.get("/user/:userId", login_required, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const educations = await EducationService.getEducationsByUserId(userId);
    res.json(educations);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/:id", login_required, async (req, res, next) => {
  try {
    const educationId = req.params.id;
    const { school, major, position } = req.body;
    const education = await EducationService.updateEducationById(educationId, school, major, position);
    res.json(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/:id", login_required, async (req, res, next) => {
  try {
    const educationId = req.params.id;
    if (educationId){
      res.status(201).send("정상적으로 삭제되었습니다.")
      await EducationService.deleteEducationById(educationId);
    } 
    else res.status(401).json({ message: "삭제할 수 없습니다." });
  } catch (error) {
    next(error);
  }
});

export { educationRouter };