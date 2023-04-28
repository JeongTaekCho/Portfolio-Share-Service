import { Project } from "../db/models/Project"; 

class ProjectService {
  static async addProject({ projectName, startDate, endDate, content, userId }) {
    const newProject = { projectName, startDate, endDate, content, userId };

    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  }

  static async getProject({ projectId }) {
    console.log(projectId);
    const project = await Project.findById({ projectId });
    if (!project) {
      const errorMessage =
        "해당 id를 가진 project 데이터는 없습니다.";
      return { errorMessage };
    }
    return project;
  }

  static async getProjects({ userId }) {
    const projects = await Project.findByUserId({ userId });
    return projects;
  }

  static async setProject({ projectId, projectName,startDate,endDate,content }) {
    let project = await Project.findById({projectId});
    console.log('projectService : ', project);

    if (!project) {
      const errorMessage =
        "해당 id를 가진 project 데이터는 없습니다.";
      return { errorMessage };
    }

    project = await Project.update({projectId,projectName,startDate,endDate,content})

    return project;
  }

  static async deleteProject(projectId) {
    console.log(projectId);
    const isDataDeleted = await Project.deleteById(projectId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 project 데이터는 없습니다.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { ProjectService };