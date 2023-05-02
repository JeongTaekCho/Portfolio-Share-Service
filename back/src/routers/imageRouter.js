import { Router } from "express";
import multer from "multer";
import path from "path";

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

imgRouter.post("/", upload.single("img"), (req, res) => {
  res.json(req.file.path);
  console.log(req.file);
});

export { imgRouter };
