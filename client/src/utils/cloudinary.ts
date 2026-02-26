interface CloudinaryOptimizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpeg' | 'png';
  crop?: 'fill' | 'scale' | 'fit' | 'thumb';
}

export const optimizeCloudinaryUrl = (
  url: string, 
  options: CloudinaryOptimizeOptions = {}
): string => {
  if (!url || !url.includes('cloudinary')) return url;

  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    crop = 'fill'
  } = options;

  // Parse the Cloudinary URL
  const urlParts = url.split('/upload/');
  if (urlParts.length !== 2) return url;

  // Build optimization parameters
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  const transformationString = transformations.join(',');
  
  return `${urlParts[0]}/upload/${transformationString}/${urlParts[1]}`;
};

// Pre-calculate breakpoints for responsive images
export const getResponsiveImageUrls = (url: string, sizes: number[]) => {
  return sizes.map(size => ({
    size,
    url: optimizeCloudinaryUrl(url, { width: size, quality: 75 })
  }));
};