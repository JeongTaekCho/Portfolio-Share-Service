import is from "@sindresorhus/is";
import express from "express";
import { login_required } from "../middlewares/login_required";
import { CertificationService } from "../services/certificationService";

const certificationRouter = express.Router();

// certification 생성
certificationRouter.post("/", login_required ,async function (req, res, next) {
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
    console.log('newCertification ',newCertification);
    res.json(newCertification);
  } catch (error) {
    next(error);
  }
});

// certification 조회
certificationRouter.get("/:id" ,login_required ,async function (req, res, next) {
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

certificationRouter.get("/user/:id", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const certifications = await CertificationService.getCertifications({ userId });
    res.json(certifications);
  } catch (error) {
    next(error);
  }
});

certificationRouter.put("/:certificationId", login_required, async function (req, res, next) {
  try {
    const { certificationId } = req.params;
    // const userId = req.currentUserId;
    const {certificationName, description, date} = req.body;
    const certification = await CertificationService.setCertification({ certificationId, certificationName, description, date});

    if (certification.errorMessage) {
      throw new Error(certification.errorMessage);
    }

    res.json(certification);
  } catch (error) {
    next(error);
  }
});

certificationRouter.delete("/:id", login_required, async function (req, res, next) {
  try {
    const certificationId = req.params.id;
    if (certificationId){
      res.status(201).json({ message: "certification 삭제 완료" });
      const result = await CertificationService.deleteCertification(certificationId);
      
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
    } 
    else res.status(401).json({ message: "삭제할 수 없습니다." });
  } catch (error) {
    next(error);
  }
});


export {certificationRouter};
