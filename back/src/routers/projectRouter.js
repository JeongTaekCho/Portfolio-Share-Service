import express from 'express';
import { ProjectModel } from '../db/schemas/project';
import { login_required } from '../middlewares/login_required';

const projectRouter = express.Router();

projectRouter.get('/',
  login_required,
  async (req, res ,next) => {
    console.log('userId', req.currentUserId)

    const projects = await ProjectModel.find({ authorId: req.currentUserId })

    console.log(projects)

    res.json(projects)
});

// User project 조회
projectRouter.get('/:id', async (req, res ,next) => {
  try {
    const projects = await ProjectModel.findById(req.params.id);
    // 디버깅
    console.log('YHJ db/routers/projectRouter.projectRouter.get() req.params.id : ' + req.params.id);
    console.log('YHJ db/routers/projectRouter.projectRouter.get() : ' + projects);

    res.send(projects);
  } catch (error) {
    console.log('YHJ db/routers/projectRouter.projectRouter.get() : ' + error); // 디버깅
    next(error);
  }
});

// rest api => method + url 
// 프로젝트 생성
projectRouter.post('/',
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { projectName, startDate, endDate, content } = req.body;
      
      const project = new ProjectModel({ projectName, startDate, endDate, content, userId });

      await project.save();
      res.json(project);
    } catch (error) {
      next(error);
    }
});

// 프로젝트 생성
projectRouter.post('/create/:id', async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const { projectName, startDate, endDate, content } = req.body;

    // 인증된 회원만 수정할 수 있는 코드 추가해야 함

    // 디버깅
    console.log('YHJ db/routers/projectRouter.projectRouter.post().user_id : ' + user_id)
    console.log('YHJ db/routers/projectRouter.projectRouter.post().projectName : ' + projectName);
    console.log('YHJ db/routers/projectRouter.projectRouter.post().startDate : ' + startDate);
    console.log('YHJ db/routers/projectRouter.projectRouter.post().endDate : ' + endDate);
    console.log('YHJ db/routers/projectRouter.projectRouter.post().content : ' + content);
    
    const project = new ProjectModel({ projectName, startDate, endDate, content });

    console.log('YHJ b/routers/projectRouter.projectRouter.post().project : ' + project); // 디버깅
    await project.save();
    res.send(project);
  } catch (error) {
    console.log('db/routers/projectRouter.projectRouter.post() : ' + error);
    next(error);
  }
});

// 프로젝트 수정
projectRouter.put('/:project_id', // project의 object id, 즉, _id
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { projectName, startDate, endDate, content } = req.body;

    // 디버깅
    console.log('YHJ db/routers/projectRouter.projectRouter.put().id : ' + id);
    console.log('YHJ db/routers/projectRouter.projectRouter.put().projectName : ' + projectName);
    console.log('YHJ db/routers/projectRouter.projectRouter.put().startDate : ' + startDate);
    console.log('YHJ db/routers/projectRouter.projectRouter.put().endDate : ' + endDate);
    console.log('YHJ db/routers/projectRouter.projectRouter.put().content : ' + content);

    const updatedProject = await ProjectModel.findByIdAndUpdate(id, { projectName, startDate, endDate, content }, { new: true }); // new: true -> 수정 후 project를 반환

    console.log('YHJ db/routers/projectRouter.projectRouter.put() updateProject : ' + updatedProject); // 디버깅

    // res.json({ project: updatedProject });
    res.send(updatedProject)
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 프로젝트 삭제
projectRouter.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('YHJ db/routers/projectRouter.projectRouter.delete().id : ' + id); // 디버깅

    await ProjectModel.findByIdAndDelete(id);
    res.json({ message: '프로젝트 삭제 완료' });
  } catch (error) {
    console.error(error); // 디버깅
    next(error);
  }
});

export default projectRouter;