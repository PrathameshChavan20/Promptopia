import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
export const POST = async (req) => {
  await connectToDB();
  const { userId, prompt, tag, imageURL } = await req.json();
  try {
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
      imageURL,
    });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
