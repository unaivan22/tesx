import React, { useState } from 'react';
import heic2any from 'heic2any';

function Home() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;

      try {
        if (fileType === 'image/heic' || fileType === 'image/heif') {
          // Use heic2any to convert HEIC to JPEG
          const blob = await heic2any({ blob: file, toType: 'image/jpeg' });
          const url = URL.createObjectURL(blob);
          setImageSrc(url); // Display the converted image
        } else if (fileType === 'image/jpeg' || fileType === 'image/png') {
          // For JPEG and PNG, read the file directly
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

export default Home;
