import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    portfolioId: {
      // portfolioId
      type: String,
      required: true,
    },
    writerId: {
      // 작성자
      type: String,
      required: true,
    },
    content: {
      // 코멘트 내용
      type: String,
      required: true,
    },
    name: {
      // 작성자 이름
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
