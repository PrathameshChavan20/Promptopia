import React from "react";
import { useState } from "react";

const FileUpload = ({ onSubmit }) => {
  const [Image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
 return (
    <div>
      <form
        onSubmit={onSubmit(Image)}
        onChange={handleImageChange}
        enctype="multipart/form-data"
      >
        <input type="file" name="file" required accept="image/*" />
        <button type="submit" className="bg-slate-600 m-5 text-white p-5">
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
