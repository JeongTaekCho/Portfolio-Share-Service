import { Comment } from "../db/models/Comment";
import { findModelById } from "../utils/findById";

class CommentService {
  static async addComment({ writerId, content, portfolioId, name }) {
    const createdNewComment = await Comment.create({ portfolioId, writerId, content, name });

    return createdNewComment;
  }

  static async getComment({ commentId }) {
    const comment = await findModelById(Comment.findById({ commentId })) 
 
    return comment;
  }

  static async getComments({ portfolioId }) {
    const comments = await findModelById(Comment.findByUserId({ portfolioId })) 

    return comments;
  }

  static async ChangeComment({ commentId, currentUserId, content }) {
    let comment = await findModelById(Comment.findById({ commentId }))
    if(comment.writerId !== currentUserId)
      throw new Error("수정 권한이 없습니다.");

    comment = await Comment.update({ commentId, content });

    return comment;
  }

  static async deleteComment(commentId, currentUserId) {
    const comment = await findModelById(Comment.findById({ commentId }))
    if(comment.writerId !== currentUserId)
      throw new Error("수정 권한이 없습니다.");

    await Comment.deleteById(commentId);

    return { status: "ok" };
  }
}

export { CommentService };
