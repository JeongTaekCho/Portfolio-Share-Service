import { EducationModel } from "../schemas/education";

class Education {
  // 학력 생성
  static async create( newEducation ) {
      const createdNewEducation = await EducationModel.create(newEducation);
      return createdNewEducation;
  }
  // 1개의 학력 검색
  static async findById({ educationId }) {
    const education = await EducationModel.findById(educationId);
    return education;
  }
  // 학력 검색
  static async findByUserId({ userId }) {
      const educations = await EducationModel.find({ userId });
      return educations;
  }
  // update
  static async update({ educationId, school, major, position }) {
    const updatedEducation = await EducationModel.findOneAndUpdate(
      {_id:educationId}
      ,{school, major, position}
      ,{new: true});

    return updatedEducation;
  }


  static async deleteById( educationId ) {
      await EducationModel.findByIdAndDelete(educationId);
      return ;
  }
}

export { Education };
