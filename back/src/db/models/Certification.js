import { CertificationModel } from "../schemas/certification";

class Certification {
  static async create( newcertification ) {
    console.log('newcertification: ',newcertification);
    const createdNewCertification = await CertificationModel.create(newcertification);
    return createdNewCertification;
  }

  static async findById({certificationId}) {
    const certification = await CertificationModel.findById(certificationId);
    console.log('certification: ',certification);
    return certification;
  }

  static async findByUserId({userId}) {
    const certification = await CertificationModel.find({ userId });
    console.log('userId certification: ',certification);
    return certification;
  }

  static async update({ certificationId, certificationName, description, date }) {
    const update = await CertificationModel.updateOne(
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
