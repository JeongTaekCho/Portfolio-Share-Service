import is from "@sindresorhus/is";
import express from "express";
import { login_required } from "../middlewares/login_required";
import { ProjectService } from "../services/projectService";

const projectRouter = express.Router();

// project 조회
projectRouter.get("/:id"
,login_required
,async function (req, res, next) {
  try {
    const projectId = req.params.id.trim();
    console.log(projectId);
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
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.currentUserId
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
    const projectId = req.params.id;
    const userId = req.currentUserId;
    console.log('projectRouter userId : ', userId);
    console.log('projectRouter projectId : ', projectId);

    const { projectName,startDate,endDate,content } = req.body;
    const project = await ProjectService.changeProject({ projectId, projectName, startDate, endDate, content, userId });
    console.log('projectRouter project: ', project);

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
    console.log('projectRouter projectId : ', projectId);
    console.log('projectRouter userId : ', userId);

    const result = await ProjectService.deleteProject(projectId, userId);

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.json({ message: 'project 삭제 완료' });
  } catch (error) {
    next(error);
  }
});

export { projectRouter };