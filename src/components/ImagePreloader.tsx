import React, { useEffect } from 'react';

interface ImagePreloaderProps {
  imageUrls: string[];
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ imageUrls }) => {
  useEffect(() => {
    // Preload all images
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);

  // This component doesn't render anything visible
  return null;
};

export default ImagePreloader;
