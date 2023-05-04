import is from "@sindresorhus/is";
import express from "express";
import { login_required } from "../middlewares/login_required";
import { CertificationService } from "../services/certificationService";
import { validateEmptyBody } from "../utils/validators"

const certificationRouter = express.Router();

// certification 생성
certificationRouter.post("/", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const userId = req.currentUserId;
    const { certificationName, description, date} = req.body;

    const newCertification = await CertificationService.addCertification({
      userId, certificationName, description, date
    });

    if (newCertification.errorMessage) 
      throw new Error(newCertification.errorMessage);

    res.status(201).json(newCertification);
  } catch (error) {
    next(error);
  }
});

// certification 조회
certificationRouter.get("/:id", login_required, async function (req, res, next) {
  try {
    const certificationId = req.params.id;

    const certification = await CertificationService.getCertification({ certificationId });
  
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

certificationRouter.put("/:id", login_required, async function (req, res, next) {
  try {
    const certificationId = req.params.id;
    const currentUserId = req.currentUserId;
    const { certificationName, description, date } = req.body;

    const certification = await CertificationService.changeCertification({ 
      certificationId, currentUserId, certificationName, description, date
    });
    
    res.json(certification);
  } catch (error) {
    next(error);
  }
});

certificationRouter.delete("/:id", login_required, async function (req, res, next) {
  try {
    const certificationId = req.params.id;
    const currentUserId = req.currentUserId;

    const result = await CertificationService.deleteCertification(certificationId, currentUserId);
  
    res.status(200).json({ message: "certification 삭제 완료" });
  } catch (error) {
    next(error);
  }
});

export {certificationRouter};
