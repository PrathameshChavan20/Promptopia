import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
export const GET = async (reqest, { params }) => {
  await connectToDB();
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
  await connectToDB();
  const { prompt, tag } = await reqest.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found!", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response("Prompt updated succesfully.", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

export const DELETE = async (reqest, { params }) => {
  await connectToDB();
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted Succesfully", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
