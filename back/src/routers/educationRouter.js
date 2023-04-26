//import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";


const educationRouter = Router();

educationRouter.post("/", login_required, async (req, res, next) => {
  try {
    const { userId, school, major, position } = req.body;
    const education = await educationService.createEducation(userId, school, major, position);
    res.status(201).json(education);
    console.log(`${school} 재학중`);
  } catch (error) {
    next(error, console.log("add router error"));
    console.error(error);
    //res.status(500).json({ message: "server error" });
  }
});

educationRouter.get("/:id", login_required, async (req, res, next) => {
  try {
    console.log(req.body.userId);
  
    const educationId = req.params.id;
    const educationList = await educationService.getEducationById(educationId);
    res.json(educationList);
    //res.status(200).send(educationList);

  } catch (error) {
    next(error);
  }
});

educationRouter.get("/user/:userId", login_required, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const educations = await educationService.getEducationsByUserId(userId);
    res.json(educations);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/:id", login_required, async (req, res, next) => {
  try {
    //const userId = req.currentUserId;
    const educationId = req.params.id;
    const { school, major, position } = req.body;
    const education = await educationService.updateEducationById(educationId, school, major, position);
    res.json(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/:id", login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const educationId = req.params.id;
    const education = await educationService.deleteEducationById(educationId);
    if (userId === education.userId){
      await educationService.deleteEducation({ eduId });
      return res.status(201).send("삭제되었습니다.");
    }
    res.status(401).json({ message: "본인만 삭제할 수 있습니다." });
    //res.json(education);
  } catch (error) {
    next(error);
  }
});

export { educationRouter };