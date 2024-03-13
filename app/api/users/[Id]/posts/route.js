import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
export const GET = async (reqest, { params }) => {
  await connectToDB();
  try {
    await connectToDB();
    const userPrompts = await Prompt.find({
      creator: params.Id,
    }).populate("creator");
    return new Response(JSON.stringify(userPrompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
