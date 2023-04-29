import { EducationModel } from "../schemas/education";

class Education {
  // 학력 생성
  static async create( newEducation ) {
      console.log('newEducation model: ',newEducation);
      const createdNewEducation = await EducationModel.create(newEducation);
      return createdNewEducation;
  }
  // 학력 검색
  static async findByUserId({ userId }) {
      console.log('userId: ',userId);
      const educations = await EducationModel.find({ userId });
      return educations;
  }
  // 개인 학력 검색
  static async findById({ educationId }) {
      console.log('educationId: ',educationId);
      const education = await EducationModel.findById(educationId);
      return education;
  }
  
  // update
  static async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }


  static async deleteById( educationId ) {
      await EducationModel.findByIdAndDelete(educationId );
      return;
  }
}

export { Education };
