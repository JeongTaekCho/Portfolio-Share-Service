import express from 'express';
import { ProjectModel } from '../db/schemas/project';
import { login_required } from '../middlewares/login_required';

const projectRouter = express.Router();

// project 조회
projectRouter.get('/:id'
  ,login_required 
  ,async (req, res ,next) => {
  try {
    const projectId = req.params.id;
    const projects = await ProjectModel.findOne({projectId});

    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// User project 조회
projectRouter.get('/user/:id'
  ,login_required 
  ,async (req, res ,next) => {
  try {
    const userId = req.params.id;
    const projects = await ProjectModel.find({userId});

    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 생성
projectRouter.post('/',
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId; // 글쓴이
      const { projectName, startDate, endDate, content } = req.body
      
      const project = new ProjectModel({ projectName, startDate, endDate, content, userId });

      await project.save();
      res.json(project);
    } catch (error) {
      next(error);
    }
});

// 프로젝트 수정
projectRouter.put('/:projectId'
  ,login_required
  ,async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.currentUserId;
    const { projectName, startDate, endDate, content } = req.body;

    const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, { projectName, startDate, endDate, content,userId}, { new: true }); // new: true -> 수정 후 project를 반환

    res.json({ project: updatedProject });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 프로젝트 삭제
projectRouter.delete('/:projectId' 
  ,login_required
  ,async (req, res, next) => {
  try {
    const { projectId } = req.params;

    await ProjectModel.findByIdAndDelete(projectId);
    res.json({ message: '프로젝트 삭제 완료' });
  } catch (error) {
    next(error);
  }
});

export default projectRouter;