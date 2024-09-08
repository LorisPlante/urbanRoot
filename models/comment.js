import { Schema, models, model, Types } from "mongoose";

const commentSchema = new Schema({
  post: {
    type: Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId, // Référence à l'utilisateur qui a commenté
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = models.Comment || model("Comment", commentSchema);
export default CommentModel;
