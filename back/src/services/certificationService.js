import { Certification } from "../db/models/Certification"; 

class CertificationService {
  static async addCertification({ userId, certificationName, description, date }) {
    const newCertification = { userId, certificationName, description, date };
    console.log('newCertification service: ',newCertification);
    const createdNewCertification = await Certification.create(newCertification );

    return createdNewCertification;
  }

  static async getCertification({ certificationId }) {
    console.log(certificationId);
    const certification = await Certification.findById({certificationId });
    if (!certification) {
      const errorMessage =
        "해당 id를 가진 certification 데이터는 없습니다.";
      return { errorMessage };
    }
    return certification;
  }

  static async getCertifications({ userId }) {
    const certification = await Certification.findByUserId({userId});
    return certification;
  }

  static async setCertification({ certificationId, certificationName, description, date }) {
    let certification = await Certification.findById({certificationId});
    console.log('certificationService : ', certification);

    if (!certification) {
      const errorMessage =
        "해당 id를 가진 certification 데이터는 없습니다.";
      return { errorMessage };
    }

    certification = await Certification.update({certificationId, certificationName, description, date})
    return certification;
  }

  static async deleteCertification(certificationId) {
    await Certification.deleteById(certificationId);
    return { status: "ok" };
  }
}

export { CertificationService };