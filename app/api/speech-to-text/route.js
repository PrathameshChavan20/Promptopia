import axios from "axios";
export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio");
    if (!audioFile)
      return new Response(
        JSON.stringify({
          message: "Audio file is missing in the request body.",
        }),
        { status: 400 }
      );

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h",
      {
        body: audioFile,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_ACCESS_TOKEN}`,
        },
      }
    );
    return new Response(response.data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    // Check if the error is due to an Axios request and it has a response with a status code
    if (err.response && err.response.status === 503) {
      // This means the service is unavailable, so we return a custom response for it
      return new Response(
        JSON.stringify({
          message:
            "Our AI model facing high traffic at momment! Please try agin later.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // For other types of errors, return a generic 500 error response
      return new Response(JSON.stringify({ message: "Something went wrong! Please try again later." }), { status: 500 });
    }
  }
};
