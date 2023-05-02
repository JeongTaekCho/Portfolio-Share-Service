import { CommentModel } from "../schemas/comment";

class Comment {
  // Comment 생성
  static async create( newComment ) {
      const createdNewComment = await CommentModel.create(newComment);
      return createdNewComment;
  }
  // Comment 검색
  static async findByUserId({ userId }) {
      const comments = await CommentModel.find({ userId });
      return comments;
  }
  // 개인 Comment 검색
  static async findById({ commentId }) {
      const comment = await CommentModel.findById(commentId);
      return comment;
  }
  
  // update
  static async update({ commentId, content}) {
    console.log('content: ',content);
    const updatedComment = await CommentModel.findOneAndUpdate(
      {_id:commentId}
      ,{content}
      ,{new: true});

    return updatedComment;
  }

  static async deleteById( commentId ) {
      await CommentModel.findByIdAndDelete(commentId);
      return ;
  }
}

export { Comment };
