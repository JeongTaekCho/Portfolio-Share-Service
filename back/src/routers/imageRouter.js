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

imgRouter.put("/", upload.single("img"), async (req, res) => {
  try {
    res.json(req.file.path);

    if (req.body.profile !== "uploads/profile.png") {
      fs.unlink(req.body.profile, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

export { imgRouter };
