import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
export const POST = async (req) => {
  await connectToDB();
  const { userId, prompt, tag, contentURL, contentType, locationPath } =
    await req.json();
  try {
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
      contentURL,
      contentType,
      locationPath,
    });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
