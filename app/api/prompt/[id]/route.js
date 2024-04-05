import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { storage } from "@/utils/firebaseAdmin";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
export const GET = async (reqest, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found!", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

export const PATCH = async (reqest, { params }) => {
  try {
    const formData = await reqest.formData();
    const file = formData.get("file");
    const prompt = formData.get("prompt");
    const tag = formData.get("tag");

    if (!file) {
      await connectToDB();
      const existingPrompt = await Prompt.findById(params.id);
      if (!existingPrompt)
        return new Response("Prompt not found!", { status: 404 });
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      await existingPrompt.save();
      return new Response("Prompt updated succesfully.", { status: 200 });
    } else {
      //file deletion
      const postContentURL = formData.get("postContentURL");
      const fileRef = ref(storage, postContentURL);
      await deleteObject(fileRef);

      //file upload
      const fileRef2 = ref(storage, `files/${file.name}+${v4()}`);

      const uploadResult = await uploadBytes(fileRef2, file);
      const metadata = await getMetadata(uploadResult.ref);
      const public_URL = await getDownloadURL(uploadResult.ref);
      await connectToDB();
      const existingPrompt = await Prompt.findById(params.id);
      if (!existingPrompt)
        return new Response("Prompt not found!", { status: 404 });
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      existingPrompt.contentURL = public_URL;
      existingPrompt.contentType = metadata.contentType;
      existingPrompt.locationPath = uploadResult.ref._location.path_;
      await existingPrompt.save();
      return new Response("Prompt updated succesfully.", { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

export const DELETE = async (reqest, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted Succesfully", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
