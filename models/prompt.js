import mongoose, { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required."],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  image: {
    data: Buffer,
    contentType: String, // To store the MIME type of the image
  },
});
const Prompt = models.Prompt || model("Prompt", promptSchema);
export default Prompt;
