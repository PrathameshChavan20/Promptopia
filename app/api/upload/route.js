import { storage } from "@/utils/firebaseAdmin";
import { ref, uploadBytes, getDownloadURL, getMetadata} from "firebase/storage";
import { v4 } from "uuid";

// Handler for POST method
export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) return new Response("No file provided", { status: 400 });

    const fileRef = ref(storage, `files/${file.name}+${v4()}`);

    const uploadResult = await uploadBytes(fileRef, file);

    const metadata = await getMetadata(uploadResult.ref);

    const public_URL = await getDownloadURL(uploadResult.ref);

   return new Response(JSON.stringify({ url: public_URL, type: metadata.contentType }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error uploading file", { status: 500 });
  }
};
