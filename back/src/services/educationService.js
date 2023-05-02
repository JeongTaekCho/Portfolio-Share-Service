import  { Education }  from "../db/models/Education";

class EducationService {
  static async addEducation({ userId, school, major, position }) {
    const createdNewEducation = await Education.create({ userId, school, major, position });
    createdNewEducation.errorMessage = null;

    if (!userId || !school || !major || !position) {
      const errorMessage = "모두 기입해 주세요";
      return { errorMessage };
    }

    return createdNewEducation;
  }
  
  static async getEducation({ educationId }) {
    console.log('educationId: ',educationId);
    const education = await Education.findById({ educationId });
    
    if (!education) {
      const errorMessage = "해당 id를 가진 education 데이터는 없습니다.";
      return { errorMessage };
    }

    return education;
  }

  static async getEducations({ userId }) {
    const educations = await Education.findByUserId({ userId });

    if (!educations) {
      const errorMessage = "해당 id를 가진 education 데이터는 없습니다.";
      return { errorMessage };
    }

    return educations;
  }

  static async ChangeEducation({ educationId, currentUserId, school, major, position }) {
    let education = await Education.findById({educationId});
    console.log('educationService : ', education);

    if (!education) {
      const errorMessage =
        "해당 id를 가진 education 데이터는 없습니다.";
      return { errorMessage };
    }
    if (education.userId !== currentUserId) {
      const errorMessage = "해당 education 수정 권한이 없습니다.";
      return { errorMessage };
    }
    
    education = await Education.update({ educationId, school, major, position })

    return education;
  }


  
  static async deleteEducation(educationId, currentUserId) {
    const education = await Education.findById({educationId});
    console.log('education: ',education);
    if (!education) {
      const errorMessage = "해당 id를 가진 education 데이터는 없습니다.";
      return { errorMessage };
    }
    if (education.userId !== currentUserId) {
      const errorMessage = "해당 education 수정 권한이 없습니다.";
      return { errorMessage };
    }

    await Education.deleteById(educationId);
    return { status: "ok" };
  }
}

export { EducationService };