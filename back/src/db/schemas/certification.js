import { Schema, model } from 'mongoose';

// award schema
const CertificationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    certificationId: {
      type: String,
      required: true,
    },
    certificationName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
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