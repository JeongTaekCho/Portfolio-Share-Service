import { Certification } from "../db/models/Certification"; 

class CertificationService {
  static async addCertification({ userId, certificationID, title, description, data }) {
    const newCertification = { userId, certificationID, title, description, data };

    const createdNewCertification = await Certification.create({ newCertification });

    return createdNewCertification;
  }

  static async getCertification({ certificationId }) {
    console.log(certificationId);
    const certification = await Certification.findById({ certificationId });
    if (!certification) {
      const errorMessage =
        "해당 id를 가진 certification 데이터는 없습니다.";
      return { errorMessage };
    }
    return certification;
  }

  static async getCertification({ userId }) {
    const certification = await Certification.findByUserId({ userId });
    return certification;
  }

  static async setCertification({ certificationId, certificationName,startDate,endDate,content }) {
    let certification = await Certification.findById({certificationId});
    console.log('certificationService : ', certification);

    if (!certification) {
      const errorMessage =
        "해당 id를 가진 certification 데이터는 없습니다.";
      return { errorMessage };
    }

    certification = await Certification.update({certificationId,certificationName,startDate,endDate,content})

    return certification;
  }

  static async deleteCertification(certificationId) {
    console.log(certificationId);
    await Certification.deleteById(certificationId);

    return { status: "ok" };
  }
}

export { CertificationService };