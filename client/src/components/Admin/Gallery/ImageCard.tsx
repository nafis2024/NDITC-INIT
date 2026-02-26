import fetchJSON from "@/api/fetchJSON";
import reqs, { reqImgWrapper } from "@/api/requests";
import ConfirmClose from "@/components/ConfirmClose";
import ImageContext from "@/context/StateContext";
import React, { useContext } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

interface ImageCardProps {
  image: any;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [, dispatch] = useContext(ImageContext) || [, () => {}];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <div className="group relative h-full w-full">
        <img
          src={reqImgWrapper(image?.BigImage) || ""}
          alt="Gallery"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute right-2 top-2 z-10 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "EDIT", state: true, data: image });
            }}
            className="pointer-events-auto bg-secondary-600 p-2 rounded-full hover:bg-secondary-700 transition-colors"
          >
            <FiEdit className="text-xl text-white" />
          </button>
          <button
            onClick={() => {
              toast.warning(
                <ConfirmClose
                  deleteAction={async () => {
                    try {
                      await fetchJSON(reqs.DELETE_GALLERY_IMG + image?.id, {
                        method: "DELETE",
                        credentials: "include",
                      });
                      dispatch({ type: "DELETE", state: false });
                      toast.success("Image Deleted Successfully.");
                    } catch (err) {
                      toast.error(String(err));
                    }
                  }}
                />,
                {
                  autoClose: false,
                  position: "bottom-center",
                  closeButton: false,
                  toastId: "close?",
                },
              );
            }}
            className="pointer-events-auto bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors"
          >
            <MdDelete className="text-xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;