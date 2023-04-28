import  EducationModel  from "../db/schemas/educaion";
import { v4 as uuidv4 } from "uuid";

export default class EducationService {
  static createEducation = async (school, major, position) => {
    const educationId = uuidv4();
    const education = new EducationModel({ school, major, position });
    console.log("education :", education)
    await education.save();
    return education;
  };
  
  static getEducationById = async (educationId) => {
    const educationsId = await EducationModel.findById(educationId);
    console.log("educationsId :", educationsId)
    return educationsId
  };
  
  static getEducationsByUserId = async (userId) => {
    return await EducationModel.find({ userId });
  };
  
  static updateEducationById = async (educationId, school, major, position) => {
    return await EducationModel.findByIdAndUpdate( 
      educationId,  // update할 id
      { school, major, position }, // 업데이트 할 내용
      { new: true }
    );
  };
  
  static deleteEducationById = async (educationId) => {
    await EducationModel.findByIdAndDelete(educationId);
    return;
  };
}

export { EducationService };