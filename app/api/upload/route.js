import multer from "multer";
import { promisify } from "util";
import stream from "stream";
import { NextResponse } from "next/server";
import { bucket } from "@/utils/firebaseAdmin"; // Adjust the import path as necessary
// Setup multer for in-memory storage
const upload = multer({ storage: multer.memoryStorage() });
const fileUpload = upload.single("file");
const pipeline = promisify(stream.pipeline);

// Disable Next.js body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Handler for POST method
export const POST = async (req,res) => {
  console.log(req.body);
  try {
    // Await multer processing the file upload
    await new Promise((resolve, reject) => {
      fileUpload(req, res, (err) => (err ? reject(err) : resolve()));
    });

    if (!req.file) {
      console.log("No file found");
      return new NextResponse("No file is selected", { status: 409 });
    }

    // Firebase Cloud Storage upload logic
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      throw new Error ("Blob stream error:", err);
    });

    await pipeline(req.file.buffer, blobStream);

    const publicUrl = `https://storage.googleapis.com/${
      bucket.name
    }/${encodeURIComponent(blob.name)}`;

    return new NextResponse("File uploaded succesfully" + publicUrl, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error uploading file", { status: 500 });
  }
};
