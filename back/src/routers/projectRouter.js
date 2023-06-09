import express from "express";
import { login_required } from "../middlewares/login_required";
import { ProjectService } from "../services/projectService";
import { validateEmptyBody } from "../utils/validators"

const projectRouter = express.Router();

// project 조회
projectRouter.get("/:id"
,login_required
,async function (req, res, next) {
  try {
    const projectId = req.params.id.trim();
    const project = await ProjectService.getProject({ projectId });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }
    res.json(project);

  } catch (error) {
    next(error);
  }
});

// User project 조회
projectRouter.get("/user/:id"
,login_required
,async function (req, res, next) {
  try {
    const userId = req.params.id;
    const projects = await ProjectService.getProjects({ userId });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});


// 프로젝트 생성
projectRouter.post("/"
,login_required
,async function (req, res, next) {
  try {
    validateEmptyBody(req);
    const userId = req.currentUserId;
    const { projectName, startDate, endDate, content } = req.body;

    const newProject = await ProjectService.addProject({
      projectName
      ,startDate
      ,endDate
      ,content
      ,userId
      ,
    });

    res.json(newProject);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 수정
projectRouter.put("/:id"
,login_required
,async function (req, res, next) {
  try {
    validateEmptyBody(req);
    const projectId = req.params.id;
    const userId = req.currentUserId;

    const { projectName,startDate,endDate,content } = req.body;
    const project = await ProjectService.changeProject({ projectId, projectName, startDate, endDate, content, userId });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 삭제
projectRouter.delete("/:id"
,login_required
, async function (req, res, next) {
  try {
    const projectId = req.params.id;
    const userId = req.currentUserId;

    await ProjectService.deleteProject(projectId, userId);

    res.json({ message: 'project 삭제 완료' });
  } catch (error) {
    next(error);
  }
});

export { projectRouter };