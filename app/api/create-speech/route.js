import axios from "axios";
export const POST = async (request) => {
  try {
    const requestBody = await request.json();
    if (!requestBody.modelURL)
      return new Response(
        JSON.stringify({
          message: "ModelURL is misssing in the request body.",
        }),
        { status: 400 }
      );
    if (!requestBody.prompt)
      return new Response(
        JSON.stringify({
          message: "prompt is misssing in the request body.",
        }),
        { status: 400 }
      );
    const response = await axios.post(
      requestBody.modelURL,
      {
        inputs: requestBody.prompt,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGINGFACE_ACCESS_TOKEN}`,
        },
        responseType: "arraybuffer", // To handle binary data (audioData in your case)
      }
    );
    return new Response(response.data, {
      status: 200,
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (err) {
    console.log(err);
    // Check if the error is due to an Axios request and it has a response with a status code
    if (err.response && err.response.status === 503) {
      // This means the service is unavailable, so we return a custom response for it
      return new Response(
        JSON.stringify({
          message:
            "Our AI model facing high traffic at momment! Please try again later.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // For other types of errors, return a generic 500 error response
      return new Response(JSON.stringify(err), { status: 500 });
    }
  }
};
