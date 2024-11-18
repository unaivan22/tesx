import React, { useState } from 'react';
import heic2any from 'heic2any';

function ImageUploader() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileName = file.name;

      try {
        // Check for HEIC by MIME type or file extension
        if (fileType === 'image/heic' || fileType === 'image/heif' || fileName.endsWith('.heic')) {
          // Convert HEIC to JPEG using heic2any
          const blob = await heic2any({ blob: file, toType: 'image/jpeg' });
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        } else if (fileType === 'image/jpeg' || fileType === 'image/png') {
          // Directly read JPEG or PNG files
          const reader = new FileReader();
          reader.onload = (e) => setImageSrc(e.target.result);
          reader.readAsDataURL(file);
        } else {
          alert("Only JPG, PNG, and HEIC formats are supported.");
        }
      } catch (error) {
        console.error("Error converting HEIC image:", error);
        alert("Failed to display HEIC image.");
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .heic"
        onChange={handleFileChange}
      />
      {imageSrc && <img src={imageSrc} alt="Preview" />}
    </div>
  );
}

export default ImageUploader;
