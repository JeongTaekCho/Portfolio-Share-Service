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
    const { certificationName, description, date} = req.body;
    const newCertification = await CertificationService.addCertification({
      userId, certificationName, description, date
    });

    if (newCertification.errorMessage) {
      throw new Error(newCertification.errorMessage);
    }

    console.log('newCertification ',newCertification);
    res.status(201).json(newCertification);
  } catch (error) {
    next(error);
  }
});

// certification 조회
certificationRouter.get("/:id"
,login_required
,async function (req, res, next) {
  try {
    const certificationId = req.params.id;
    console.log(certificationId);
    const certification = await CertificationService.getCertification({ certificationId });

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
    const certifications = await CertificationService.getCertifications({ userId });
    res.json(certifications);
  } catch (error) {
    next(error);
  }
});

certificationRouter.put("/:id"
,login_required
,async function (req, res, next) {
  try {
    const certificationId = req.params.id;
    const currentUserId = req.currentUserId;
    const { certificationName, description, date } = req.body;
    const certification = await CertificationService.changeCertification({ certificationId, currentUserId, certificationName, description, date});

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
,async function (req, res, next) {
  try {
    const certificationId = req.params.id;
    const currentUserId = req.currentUserId;
    const result = await CertificationService.deleteCertification(certificationId, currentUserId);
    
    if (result.errorMessage) throw new Error(result.errorMessage);
    
    res.status(200).json({ message: "certification 삭제 완료" });
    
  } catch (error) {
    next(error);
  }
});


export {certificationRouter};
