import React, { useState } from 'react';
import heic2any from 'heic2any'; // Library to convert HEIC to JPEG/PNG

function Home() {
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setIsLoading(true);

    // If the file is HEIC, use heic2any to convert to a supported format
    if (selectedFile.type === 'image/heic') {
      heic2any({ blob: selectedFile, toType: 'image/jpeg' }) // Convert HEIC to JPEG
        .then((convertedBlob) => {
          const blobURL = URL.createObjectURL(convertedBlob);
          setPreviewURL(blobURL); // Set preview for the image
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error converting HEIC to JPEG:', error);
          setIsLoading(false);
        });
    } else {
      // For non-HEIC files, use FileReader to generate a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/heic,.dng"
        onChange={handleImageChange}
        disabled={isLoading}
      />
      {previewURL && !isLoading && (
        <div className="image-preview">
          <img src={previewURL} alt="Preview" />
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default Home;
