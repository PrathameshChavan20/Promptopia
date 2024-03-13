'use client'
import FileUpload from "@/components/FileUpload";

const UploadFile = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);
    
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message, data.url);
      // Handle success (e.g., display uploaded image URL or preview)
    } else {
      // Handle error
      console.error("Upload failed");
    }
  };

  return (
    <div>
      <h1>Upload Image to Firebase</h1>
      <FileUpload onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadFile;
