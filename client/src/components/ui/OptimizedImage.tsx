'use client';

import React, { useState, useEffect, useRef } from 'react';
import { optimizeCloudinaryUrl } from '@/utils/cloudinary';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
  figcaption?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  onClick,
  figcaption
}) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized URLs for different screen sizes
  const getOptimizedSrc = (w?: number) => {
    if (!src.includes('cloudinary')) return src;
    return optimizeCloudinaryUrl(src, { 
      width: w || width || 800, 
      quality: isLoading ? 10 : 75, // Low quality while loading
      format: 'auto'
    });
  };

  // Use low-quality placeholder initially
  useEffect(() => {
    if (!priority) {
      setCurrentSrc(getOptimizedSrc(50)); // Very small placeholder
    } else {
      setCurrentSrc(getOptimizedSrc(width));
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setCurrentSrc(getOptimizedSrc(width));
  };

  return (
    <figure className="relative overflow-hidden" onClick={onClick}>
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'} transition-all duration-300`}
        loading={priority ? 'eager' : 'lazy'}
        width={width}
        height={height}
        sizes={sizes}
        srcSet={`
          ${getOptimizedSrc(400)} 400w,
          ${getOptimizedSrc(800)} 800w,
          ${getOptimizedSrc(1200)} 1200w
        `}
        onLoad={handleLoad}
        onError={() => setCurrentSrc(src)} // Fallback to original
      />
      {figcaption && (
        <figcaption className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
          {figcaption}
        </figcaption>
      )}
    </figure>
  );
};

export default OptimizedImage;