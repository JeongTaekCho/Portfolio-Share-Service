import { EducationModel } from "../db";
import { v4 as uuidv4 } from "uuid";

export const createEducation = async (userId, school, major, position) => {
  const educationId = uuidv4();
  const education = new EducationModel({ userId, educationId, school, major, position });
  return await education.save();
};

export const getEducationById = async (educationId) => {
  return await EducationModel.findById(educationId);
};

export const getEducationsByUserId = async (userId) => {
  return await EducationModel.find({ userId });
};

export const updateEducationById = async (educationId, school, major, position) => {
  return await EducationModel.findByIdAndUpdate( 
    educationId,  // update할 id
    { school, major, position }, // 업데이트 할 내용
    { new: true }
  );
};

export const deleteEducationById = async (educationId) => {
  return await EducationModel.findByIdAndDelete(educationId);
};