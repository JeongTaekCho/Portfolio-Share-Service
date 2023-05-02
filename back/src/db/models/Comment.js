import { CommentModel } from "../schemas/comment";

class Comment {
  // Comment 생성
  static async create(newComment) {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  }
  static async find({ commentId }) {
    const comments = await CommentModel.find({ commentId });
    return comments;
  }
  // 1개의 Comment 검색
  static async findById({ commentId }) {
    const comment = await CommentModel.findById(commentId);
    return comment;
  }
  // Comment 검색
  static async findByUserId({ portfolioId }) {
    const comments = await CommentModel.find({ portfolioId });
    return comments;
  }

  // update
  static async update({ commentId, content }) {
    const updatedComment = await CommentModel.findOneAndUpdate({ _id: commentId }, { content }, { new: true });

    return updatedComment;
  }

  static async deleteById(commentId) {
    await CommentModel.findByIdAndDelete(commentId);
    return;
  }
}

export { Comment };
