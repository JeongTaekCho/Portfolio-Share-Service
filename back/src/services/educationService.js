import  { Education }  from "../db/models/Education";
import { v4 as uuidv4 } from "uuid";


class EducationService {
  static async addEducation({ userId, school, major, position }) {
    const newEducation = { userId, school, major, position };
    const createdNewEducation = await Education.create(newEducation);
    createdNewEducation.errorMessage = null;
    return createdNewEducation;
  }
  
  static async getEducation({ educationId }) {
    console.log(educationId)
    const education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage = "해당 id를 가진 education 데이터는 없습니다.";
      return { errorMessage };
    }

    return education;
  }

  static async getEducations({ userId }) {
    const educations = await Education.findByUserId({ userId });
    return educations;
  }

  static async setEducation({ educationId, school, major, position }) {
    let education = await Education.findById({educationId});
    console.log('educationService : ', education);

    if (!education) {
      const errorMessage =
        "해당 id를 가진 education 데이터는 없습니다.";
      return { errorMessage };
    }
    education = await Education.update({ educationId, school, major, position })

    return education;
  }


  
  static async deleteEducation(educationId) {
    await Education.deleteById(educationId);
    return { status: "ok" };
  }
}

export { EducationService };