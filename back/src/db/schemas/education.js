import { Schema, model } from "mongoose";

const educationSchema = new Schema(
  {
    userId: { // userId
      type: String,
      required: true,
    },
    school: { // 학교 이름
      type: String,
      required: true,
    },
    major: {  // 전공명
      type: String,
      required: true,
    },
    position: { // 학력 상태
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    /* 
    ceatedAt: Date,
    updateAt: Date,
    updateBy: String,
    createdBy: String,
    */
  }
);

const EducationModel = model("EducationModel", educationSchema);

export { EducationModel };
