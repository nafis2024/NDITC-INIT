"use client";
import { reqImgWrapper } from "@/api/requests";
import React, { useState, useMemo } from "react";
import GalleryImage from "./GalleryImage";
import ImageViewer from "./ImageViewer";

const ImagesCont = ({ images }: { images: any[] }) => {
  const [index, setIndex] = useState<number>(-1);

  // Memoize processed images to avoid re-processing on every render
  const processedImages = useMemo(() => {
    return images.map((item: any) => ({
      ...item,
      optimizedUrl: reqImgWrapper(item.BigImage)?.toString() || '',
    }));
  }, [images]);

  return (
    <>
      <section className="gallery grid-gallery px-1 md:px-10">
        {processedImages.map((item: any, key: number) => {
          if (key !== 0) {
            return (
              <GalleryImage
                key={`gallery-${key}`}
                keyVal={key}
                item={item}
                openModal={() => setIndex(key)}
              />
            );
          }
          return null;
        })}
      </section>
      <ImageViewer
        state={index >= 0}
        close={() => setIndex(-1)}
        initIndex={index}
        images={processedImages.map(({ optimizedUrl }) => optimizedUrl)}
      />
    </>
  );
};

export default ImagesCont;