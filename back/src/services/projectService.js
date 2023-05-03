import { Project } from "../db/models/Project"; 
import { findModelById } from "../utils/findById";

class ProjectService {
  static async addProject({ projectName, startDate, endDate, content, userId }) {
    if (!projectName || !startDate || !endDate || !content || !userId){
      throw new Error("모두 기입해 주세요.");
    } 
    const newProject = { projectName, startDate, endDate, content, userId };

    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  }

  static async getProject({ projectId }) {
    const project = findModelById(Project.findById({ projectId }));
    return project;
  }

  static async getProjects({ userId }) {
    const projects = findModelById(Project.findByUserId({ userId }));
    return projects;
  }

  static async changeProject({ projectId, projectName, startDate, endDate, content, userId }) {
    let project = await findModelById(Project.findById({projectId}), userId);
    project = await Project.update({projectId, projectName, startDate, endDate, content})

    return project;
  }

  static async deleteProject(projectId, userId) {
    const project = await findModelById(Project.findById({ projectId }), userId);
    
    await Project.deleteById(projectId);
    return { status: "ok" };
  }

}

export { ProjectService };