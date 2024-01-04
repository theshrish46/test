import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;
