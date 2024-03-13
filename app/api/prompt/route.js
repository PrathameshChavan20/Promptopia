import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
export const GET = async (req) => {
  await connectToDB();
  try {
    await connectToDB();
    const constPrompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(constPrompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
