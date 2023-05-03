import { Comment } from "../db/models/Comment";

class CommentService {
  static async addComment({ writerId, content, portfolioId, name }) {
    const createdNewComment = await Comment.create({ portfolioId, writerId, content, name });

    return createdNewComment;
  }

  static async getComment({ commentId }) {
    const comment = await Comment.findById({ commentId });

    if (!comment) {
      const errorMessage = "해당 comment는 없습니다.";
      return { errorMessage };
    }

    return comment;
  }

  static async getComments({ portfolioId }) {
    const comments = await Comment.findByUserId({ portfolioId });

    if (!comments) {
      const errorMessage = "해당 comment는 없습니다.";
      return { errorMessage };
    }

    return comments;
  }

  static async ChangeComment({ commentId, currentUserId, content }) {
    let comment = await Comment.findById({ commentId });

    if (!comment) {
      const errorMessage = "해당 id를 가진 comment 데이터는 없습니다.";
      return { errorMessage };
    }

    if (comment.writerId !== currentUserId) {
      const errorMessage = "해당 comment 수정 권한이 없습니다.";
      return { errorMessage };
    }

    comment = await Comment.update({ commentId, content });

    return comment;
  }

  static async deleteComment(commentId, currentUserId) {
    const comment = await Comment.findById({ commentId });

    if (!comment) {
      const errorMessage = "해당 id를 가진 comment 데이터는 없습니다.";
      return { errorMessage };
    }
    if (comment.writerId !== currentUserId) {
      const errorMessage = "해당 comment 수정 권한이 없습니다.";
      return { errorMessage };
    }

    await Comment.deleteById(commentId);
    return { status: "ok" };
  }
}

export { CommentService };
