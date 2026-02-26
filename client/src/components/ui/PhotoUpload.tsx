import React from 'react';

interface PhotoUploadProps {
  name: string;
  type: 'PFP' | 'IMG';
  defaultImage?: string;
  divClass?: string;
  currentPhoto: string | null;
  setCurrentPhoto: (s: string | null) => void;
  required?: boolean;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  name,
  type,
  defaultImage,
  divClass = '',
  currentPhoto,
  setCurrentPhoto,
  required = false,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`space-y-2 ${divClass}`}>
      <label className="block text-sm font-medium text-gray-300">
        {type === 'PFP' ? 'Profile Picture' : 'Image'}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex items-center space-x-4">
        {/* Preview */}
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-700">
          {currentPhoto ? (
            <img
              src={currentPhoto}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : defaultImage ? (
            <img
              src={defaultImage}
              alt="Default"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div>
          <input
            type="file"
            id={name}
            name={name}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            required={required && !currentPhoto && !defaultImage}
          />
          <label
            htmlFor={name}
            className="cursor-pointer bg-secondary-600 hover:bg-secondary-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Choose Image
          </label>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;