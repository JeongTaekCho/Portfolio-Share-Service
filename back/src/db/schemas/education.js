import { Schema, model } from "mongoose";

const educationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    educationId: {  
      type: String,
      //required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
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
