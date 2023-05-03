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

imgRouter.post("/", upload.single("img"),async(req, res) => {
  console.log("req.body.profile : ", req.body.profile);

  res.json(req.file.path);

  fs.unlink(req.body.profile , (err) =>{
    if(err){
      next(err);
      return;
    }
    console.log('이미지가 삭제되었습니다.');
  });
});

export { imgRouter };