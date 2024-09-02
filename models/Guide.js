import mongoose, { Schema, model, models } from "mongoose";

const GuideSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Guide = models.Guide || model("Guide", GuideSchema);

export default Guide;
