import fetchJSON from "@/api/fetchJSON";
import reqs, { reqImgWrapper } from "@/api/requests";
import Input from "@/components/ui/form/Input";
import ImageContext from "@/context/StateContext";
import useForm from "@/hooks/useForm";
import React, { useContext } from "react";

const EditPhotoForm = () => {
  const [imgState, dispatch] = useContext(ImageContext) || [, () => {}];

  const [form, formLoading] = useForm(
    {
      handler: async (data) => {
        // Ensure numeric values are properly parsed
        const payload = {
          id: data.id,
          rows: parseInt(data.rows) || 1,
          cols: parseInt(data.cols) || 1,
          order: parseInt(data.order) || 0,
        };
        
        const res = await fetchJSON(
          reqs.UPDATE_GALLERY_IMG + data?.id,
          {
            method: "PATCH",
            credentials: "include",
          },
          payload,
        );

        return res;
      },
      successMsg: "Image updated successfully!",
      onSuccess() {
        dispatch({ type: "EDIT", state: false, data: null });
      },
    },
    [imgState?.data],
  );

  return (
    <div className="bg-opacity-200 w-full max-w-[550px] rounded-2xl bg-secondary-700/80 to-gray-900 p-6 shadow-lg">
      <form className="space-y-6" ref={form}>
        <h2 className="Inter text-center text-2xl font-extrabold text-secondary-200 md:text-3xl lg:mb-0 lg:mt-0 lg:text-left lg:text-4xl">
          Edit Photo
        </h2>

        <div className="space-y-4">
          <Input name="id" value={imgState?.data?.id} hidden />
          
          {/* Image Preview */}
          {imgState?.data?.BigImage && (
            <div className="mb-4">
              <img 
                src={reqImgWrapper(imgState.data.BigImage) || ''} 
                alt="Current" 
                className="max-h-48 rounded-lg object-cover mx-auto"
              />
            </div>
          )}
          
          <Input
            type="number"
            label="Rows"
            name="rows"
            defaultValue={imgState?.data?.rows || 1}
            min="1"
            required
          />
          <Input
            type="number"
            label="Cols"
            name="cols"
            defaultValue={imgState?.data?.cols || 1}
            min="1"
            required
          />
          <Input
            type="number"
            label="Order"
            name="order"
            defaultValue={imgState?.data?.order || 0}
            min="0"
            required
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "EDIT", state: false, data: null });
            }}
            className="rounded-full bg-secondary-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formLoading}
            className="rounded-full bg-secondary-500 px-6 py-2 text-white hover:bg-primary-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPhotoForm;