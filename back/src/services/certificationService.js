import { Certification } from "../db/models/Certification"; 

class CertificationService {
  static async addCertification({ userId, certificationName, description, date }) {
    const foundCertification = await Certification.find({ userId, certificationName })
    if(foundCertification.length > 0){
      const errorMessage = "해당 자격증이 존재합니다";
      return { errorMessage };
    }
    
    const newCertification = { userId, certificationName, description, date };
 
    const createdNewCertification = await Certification.create(newCertification );

    return createdNewCertification;
  }

  static async getCertification({ certificationId }) {
    const certification = await Certification.findById({certificationId });

    if (!certification) {
      const errorMessage = "해당 id를 가진 certification 데이터는 없습니다.";
      return { errorMessage };
    }
    return certification;
  }

  static async getCertifications({ userId }) {
    const certification = await Certification.findByUserId({userId});

    if (!certification) {
      const errorMessage = "해당 id를 가진 certification 데이터는 없습니다.";
      return { errorMessage };
    }
    return certification;
  }

  static async changeCertification({ certificationId, currentUserId, certificationName, description, date }) {
    let certification = await Certification.findById({certificationId});
    if (!certification) {
      const errorMessage = "해당 id를 가진 certification 데이터는 없습니다.";
      return { errorMessage };
    }
    if (certification.userId !== currentUserId) {
      const errorMessage = "해당 certification 수정 권한이 없습니다.";
      return { errorMessage };
    }

    certification = await Certification.update({certificationId, certificationName, description, date})
    return certification;
  }

  static async deleteCertification(certificationId, currentUserId) {
    const certification = await Certification.findById({certificationId});
    if (!certification) {
      const errorMessage = "해당 id를 가진 certification 데이터는 없습니다.";
      return { errorMessage };
    }
    if (certification.userId !== currentUserId) {
      const errorMessage = "해당 certification 수정 권한이 없습니다.";
      return { errorMessage };
    }
    await Certification.deleteById(certificationId);
    return { status: "ok" };
  }
}

export { CertificationService };