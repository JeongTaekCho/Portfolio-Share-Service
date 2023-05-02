import { CertificationModel } from "../schemas/certification";

class Certification {
  // Certification 생성
  static async create( newcertification ) {
    const createdNewCertification = await CertificationModel.create(newcertification);
    return createdNewCertification;
  }
  //
  static async find(query) {
    const certificates = await CertificationModel.find(query);
    return certificates;
  }
  // 1개의 Certification 검색
  static async findById({certificationId}) {
    const certification = await CertificationModel.findById(certificationId);
    return certification;
  }
  // Certification 검색
  static async findByUserId({userId}) {
    const certification = await CertificationModel.find({ userId });
    return certification;
  }
  // update
  static async update({ certificationId, certificationName, description, date }) {
    const update = await CertificationModel.findOneAndUpdate(
      {_id:certificationId}
      ,{certificationName, description, date}
      ,{new: true}
    );

    return update;
  }

  static async deleteById(certificateId) {
    await CertificationModel.findByIdAndDelete(certificateId);
  }
}

export { Certification };
