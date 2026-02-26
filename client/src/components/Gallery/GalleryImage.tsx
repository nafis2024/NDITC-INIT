"use client";

import { reqImgWrapper } from "@/api/requests";
import OptimizedImage from "@/components/ui/OptimizedImage";

const GalleryImage = ({
  item,
  keyVal,
  openModal,
}: {
  item: any;
  keyVal: number;
  openModal: () => void;
}) => {
  const imageUrl = reqImgWrapper(item.BigImage)?.toString() || '';

  return (
    <figure className={`image-${keyVal} cursor-pointer relative group`} onClick={openModal}>
      <a data-featherlight="image">
        <OptimizedImage
          src={imageUrl}
          alt={`Gallery image ${keyVal}`}
          className="w-full h-full object-cover rounded-lg"
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          figcaption={`Image ${keyVal}`}
        />
      </a>
    </figure>
  );
};

export default GalleryImage;