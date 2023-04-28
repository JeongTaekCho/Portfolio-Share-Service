import is from "@sindresorhus/is";
import express from "express";
import { login_required } from "../middlewares/login_required";
import { CertificationService } from "../services/certificationService";

const certificationRouter = express.Router();

// certification 생성
certificationRouter.post("/"
,login_required
,async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.currentUserId;
    console.log(userId);
    const { certificationName, date} = req.body;

    const newCertification = await CertificationService.addCertification({
      certificationName
      ,date
      ,userId
      ,
    });

    res.json(newCertification);
  } catch (error) {
    next(error);
  }
});

// certification 조회
CertificationRouter.get("/:id"
,login_required
,async function (req, res, next) {
  try {
    const certificationId = req.params.id;
    console.log(certificationId);
    const certification = await CertificationService.getcertification({ certificationId });

    if (certification.errorMessage) {
      throw new Error(certification.errorMessage);
    }
    res.json(certification);

  } catch (error) {
    next(error);
  }
});

certificationRouter.get("/user/:id"
,login_required
,async function (req, res, next) {
  try {
    const userId = req.params.id;
    const certifications = await CertificationService.getCertification({ userId });
    res.json(certifications);
  } catch (error) {
    next(error);
  }
});

certificationRouter.put("/:certificationId"
,login_required
,async function (req, res, next) {
  try {
    const { certificationId } = req.params;
    // const userId = req.currentUserId;

    const {certificationName, date} = req.body;

    const certification = await CertificationService.setCertification({ certificationId, certificationName, date});

    if (certification.errorMessage) {
      throw new Error(certification.errorMessage);
    }

    res.json(certification);
  } catch (error) {
    next(error);
  }
});

certificationRouter.delete("/:id"
,login_required
, async function (req, res, next) {
  try {
    const certificationId = req.params.id;
    console.log('certificationRouter certificationId : ', certificationId);

    const result = await CertificationService.deleteCertification(certificationId);

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.json({ message: '프로젝트 삭제 완료' });
  } catch (error) {
    next(error);
  }
});


export {certificationRouter};
