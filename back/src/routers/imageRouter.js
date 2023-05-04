import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const imgRouter = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

// HTTP PUT 메서드 처리 로직
imgRouter.put("/", upload.single("img"), async (req, res, next) => {
  try {
    // 파일 업로드 후 업로드된 파일의 경로를 클라이언트에 응답
    res.json({ path: req.file.path });

    // 이전 프로필 이미지 파일 삭제
    if (req.body.profile) {
      if (fs.existsSync(req.body.profile)) {
        fs.unlink(req.body.profile, (err) => {
          if (err) {
            throw new Error(err);
          }
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

// HTTP POST 메서드 처리 로직
imgRouter.post("/", upload.single("img"), async (req, res, next) => {
  try {
    // 파일 업로드 후 업로드된 파일의 경로를 클라이언트에 응답
    res.json({ path: req.file.path });

    // 이전 프로필 이미지 파일 삭제
    if (req.body.profile) {
      if (fs.existsSync(req.body.profile)) {
        fs.unlink(req.body.profile, (err) => {
          if (err) {
            throw new Error(err);
          }
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

export { imgRouter };
