import { CertificateModel } from "../schemas/certificate";

class Certification {
  static async create({ newcertification }) {
    const createdNewCertification = await CertificateModel.create(newcertification);
    return createdNewCertification;
  }

  static async findById({ certificationId }) {
    const certification = await CertificateModel.findById(acertificationId);
    console.log(certificationId);
    return certification;
  }

  static async findByUserId({ userId }) {
    const certification = await CertificateModel.find({ userId });
    return certification;
  }

  static async update({ certificationId, certificationName, date }) {
    const update = await CertificateModel.updateOne(
      {_id:certificationId}
      ,{certificationName,date}
      ,{new: true}
    );

    return update;
  }

  static async deleteById(certificateId) {
    await CertificateModel.findByIdAndDelete(certificateId);
  }
}

export { Certification };
