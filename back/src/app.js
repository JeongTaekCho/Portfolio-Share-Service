import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import { projectRouter } from "./routers/projectRouter";
import { awardRouter } from "./routers/awardRouter";
import { educationRouter } from "./routers/educationRouter";
import { certificationRouter } from "./routers/certificationRouter";
import { commentRouter } from "./routers/commentRouter";
import { imgRouter } from "./routers/imageRouter";
import path from "path";
import { gptRouter } from "./routers/gptRouter";

const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("back")); // 백엔드 폴더를 static 파일로 제공

app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = `uploads/${filename}`;
  const options = {
    root: path.join(__dirname, "../"),
  };
  res.sendFile(filePath, options);
});

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use("/educations", educationRouter);
app.use("/projects", projectRouter);
app.use("/awards", awardRouter);
app.use("/certifications", certificationRouter);
app.use("/comments", commentRouter);
app.use("/upload", imgRouter);
app.use("/chat", gptRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)

app.use((req, res) => {
  res.status(404).send("Not Found");
});

// 405 오류 처리
app.use((err, req, res, next) => {
  if (err.status === 405) {
    res.status(405).send("Method Not Allowed");
  } else {
    next(err);
  }
});

app.use(errorMiddleware);

export { app };
