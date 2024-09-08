import { Schema, models, model, Types } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId, // Référence à l'utilisateur qui a créé le post
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = models.Post || model("Post", postSchema);
export default PostModel;
