import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CommentService } from "../services/commentService";

const commentRouter = Router();

// comment 생성
commentRouter.post("/", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
    }

    const writerId = req.currentUserId;
    const { content, portfolioId, name } = req.body;

    const comment = await CommentService.addComment({ writerId, content, portfolioId, name });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

commentRouter.get("/:id", login_required, async function (req, res, next) {
  try {
    const commentId = req.params.id;

    const commentList = await CommentService.getComment({ commentId });

    res.json(commentList);
  } catch (error) {
    next(error);
  }
});

commentRouter.get("/user/:userId", login_required, async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const comments = await CommentService.getComments({ userId });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

commentRouter.put("/:id", login_required, async function (req, res, next) {
  try {
    const commentId = req.params.id;
    const currentUserId = req.currentUserId;
    const content = req.body.content;

    const comment = await CommentService.ChangeComment({ commentId, currentUserId, content });

    if (comment.errorMessage) {
      throw new Error(comment.errorMessage);
    }

    res.json(comment);
  } catch (error) {
    next(error);
  }
});

commentRouter.delete("/:id", login_required, async function (req, res, next) {
  try {
    const commentId = req.params.id;
    const currentUserId = req.currentUserId;
    const result = await CommentService.deleteComment(commentId, currentUserId);

    if (result.errorMessage) throw new Error(result.errorMessage);

    res.status(200).json({ message: "comment 삭제 완료" });
  } catch (error) {
    next(error);
  }
});

export { commentRouter };
