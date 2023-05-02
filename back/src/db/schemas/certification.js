import { Schema, model } from 'mongoose';

// award schema
const CertificationSchema = new Schema(
  {
    userId: {  // userId
      type: String,
      required: true,
    },
    certificationName: { // 자격증 이름
      type: String,
      required: true,
    },
    description: { // 상세내용 
      type: String,
      required: true,
    },
    date: { //취득 날짜
      type: Date,
      required: true,
    },
  },
    {
        timestamps: true,    
    }
);

const CertificationModel = model('Certification', CertificationSchema);

export { CertificationModel };