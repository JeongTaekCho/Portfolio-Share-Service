import  { Education }  from "../db/models/Education";
import { findModelById } from "../utils/findById";

class EducationService {
  static async addEducation({ userId, school, major, position }) {
    if (!userId || !school || !major || !position) 
      throw new Error("모두 기입해 주세요.");
    const createdNewEducation = await Education.create({ userId, school, major, position });

    return createdNewEducation;
  }
  
  static async getEducation({ educationId }) {
    const education = await findModelById(Education.findById({ educationId }))

    return education;
  }

  static async getEducations({ userId }) {
    const educations = await findModelById(Education.findByUserId({ userId }))

    return educations;
  }

  static async changeEducation({ educationId, currentUserId, school, major, position }) {
    let education = await findModelById(Education.findById({educationId}), currentUserId)

    education = await Education.update({ educationId, school, major, position })

    return education;
  }

  static async deleteEducation(educationId, currentUserId) {
    const education = await findModelById(Education.findById({educationId}), currentUserId);

    await Education.deleteById(educationId);
    return { status: "ok" };
  }
}

export { EducationService };