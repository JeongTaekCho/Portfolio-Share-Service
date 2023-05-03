import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findById({ projectId }) {
    const project = await ProjectModel.findById(projectId);
    console.log(project)
    return project;
  }

  static async findByUserId({ userId }) {
    const projects = await ProjectModel.find({ userId });
    return projects;
  }

  static async update({ projectId, projectName, startDate, endDate, content}) {
    const updatedProject = await ProjectModel.updateOne(
      {_id:projectId}
      ,{projectName, startDate, endDate, content}
      ,{new: true});

    return updatedProject;
  }

  static async deleteById(projectId) {
    await ProjectModel.findByIdAndDelete(projectId);
  }
}

export { Project };
