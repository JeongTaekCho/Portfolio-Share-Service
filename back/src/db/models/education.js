import { EducationModel } from "../schemas/education";

class Education {
  // 학력 생성
  static async create({ newEducation }) {
      const createdNewEducation = await EducationModel.create(newEducation);
      return createdNewEducation;
  }
  // 학력 검색
  static async findAllById({ userId }) {
      const educations = await EducationModel.find({ userId });
      return educations;
  }
  // 개인 학력 검색
  static async findByEducationId({ educationId }) {
      const education = await EducationModel.findOne({ educationId });
      return education;
  }
  
  // update
  static async update(educationId, fieldToUpdate, newValue) {
    const updatedEducation = await EducationModel.findByIdAndUpdate( 
        educationId,  // filter
        { [fieldToUpdate]: newValue }, // update
        { new: true } // option
    );
    return updatedEducation
  }

  static async delete({ educationId }) {
      await EducationModel.findOneAndDelete({ educationId });
      return;
  }
}

export { Education };
