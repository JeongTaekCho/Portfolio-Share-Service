import { Certification } from "../db/models/Certification"; 
import { findModelById } from "../utils/findById";

class CertificationService {
  static async addCertification({ userId, certificationName, description, date }) {
    const foundCertification = await Certification.find({ userId, certificationName })
    if(foundCertification.length > 0)
      throw new Error("해당 자격증이 존재합니다."); 
      
    const newCertification = { userId, certificationName, description, date };
    const createdNewCertification = await Certification.create(newCertification );

    return createdNewCertification;
  }

  static async getCertification({ certificationId }) {
    const certification = findModelById(Certification.findById({certificationId }))

    return certification;
  }

  static async getCertifications({ userId }) {
    const certifications = findModelById(Certification.findByUserId({userId}))
  
    return certifications;
  }

  static async changeCertification({ certificationId, currentUserId, certificationName, description, date }) {
    let certification = findModelById(Certification.findById({certificationId}), currentUserId)

    certification = await Certification.update({certificationId, certificationName, description, date})
    
    return certification;
  }

  static async deleteCertification(certificationId, currentUserId) {
    const certification = findModelById(Certification.findById({certificationId}), currentUserId)
    
    await Certification.deleteById(certificationId);
    
    return { status: "ok" };
  }
}

export { CertificationService };