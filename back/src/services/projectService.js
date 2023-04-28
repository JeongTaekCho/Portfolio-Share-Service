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

  static async setProject({ projectId, toUpdate }) {
    let project = await Project.findById({ projectId });

    if (!project) {
      const errorMessage =
        "해당 id를 가진 project 데이터는 없습니다.";
      return { errorMessage };
    }

    // 업데이트 대상의 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.projectName) {
      const fieldToUpdate = "projectName";
      const newValue = toUpdate.projectName;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.startDate) {
        const fieldToUpdate = "startDate";
        const newValue = toUpdate.startDate;
        project = await Project.update({ projectId, fieldToUpdate, newValue });
      }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.content) {
      const fieldToUpdate = "content";
      const newValue = toUpdate.content;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    return project;
  }

  static async deleteProject({ projectId }) {
    const isDataDeleted = await Project.deleteById({ projectId });

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