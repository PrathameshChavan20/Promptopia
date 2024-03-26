import axios from "axios";

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return new Response(
        JSON.stringify({
          message: "Audio file is missing in the request body.",
        }),
        { status: 400 }
      );
    }

    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/wav2vec2-large-960h-lv60-self",
      audioBuffer,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_ACCESS_TOKEN}`,
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    if (err.response && err.response.status === 503) {
      return new Response(
        JSON.stringify({
          message:
            "Our AI model facing high traffic at momment! Please try agin later.",
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Something went wrong! Please try again later.",
        }),
        { status: 500 }
      );
    }
  }
};
