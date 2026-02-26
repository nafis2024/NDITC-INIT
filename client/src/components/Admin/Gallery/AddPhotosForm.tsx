import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Input from "@/components/ui/form/Input";
import Loading from "@/components/ui/LoadingWhite";
import PhotoUpload from "@/components/ui/PhotoUpload";
import ImageContext from "@/context/StateContext";
import useForm from "@/hooks/useForm";
import React, { useContext, useState } from "react";

const AddPhotosForm = () => {
  const [, dispatch] = useContext(ImageContext) || [, () => {}];
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  const [form, formLoading] = useForm({
    handler: async (data, formData) => {
      // Ensure numeric values are properly converted
      if (formData) {
        formData.set('rows', String(parseInt(data.rows) || 1));
        formData.set('cols', String(parseInt(data.cols) || 1));
        formData.set('order', String(parseInt(data.order) || 0));
      }
      
      const res = await fetchJSON(
        reqs.ADD_GALLERY_IMG,
        {
          method: "POST",
          credentials: "include",
        },
        formData,
        true,
      );

      return res;
    },
    successMsg: "Image uploaded successfully!",
    formData: true,
    onSuccess() {
      setCurrentPhoto(null);
      dispatch({ type: "ADD", state: false });
    },
  });

  return (
    <div className="bg-opacity-200 max-h-[100vh] w-full max-w-[550px] overflow-y-auto rounded-2xl bg-secondary-700/80 to-gray-900 p-6 shadow-lg">
      <form className="space-y-6" ref={form}>
        <h2 className="Inter text-center text-2xl font-extrabold text-secondary-200 md:text-3xl lg:mb-0 lg:mt-0 lg:text-left lg:text-4xl">
          Add Photos
        </h2>

        <div className="space-y-4">
          <Input 
            type="number" 
            label="Rows" 
            name="rows" 
            defaultValue="1"
            min="1"
            required
          />
          <Input 
            type="number" 
            label="Cols" 
            name="cols" 
            defaultValue="1"
            min="1"
            required
          />
          <Input 
            type="number" 
            label="Order" 
            name="order" 
            defaultValue="0"
            min="0"
            required
          />
        </div>

        <PhotoUpload
          name="gallery"
          type="IMG"
          currentPhoto={currentPhoto}
          setCurrentPhoto={setCurrentPhoto}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => {
              dispatch({ type: "ADD", state: false });
            }}
            type="button"
            className="rounded-full bg-secondary-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formLoading}
            className="rounded-full bg-secondary-500 px-6 py-2 text-white hover:bg-primary-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formLoading ? <Loading /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPhotosForm;